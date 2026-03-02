import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { activity_id, parameters, region } = body;

    const isGas = activity_id && activity_id.includes("gas");
    const isElectricity = activity_id && activity_id.includes("electricity");
    const safeParameters = parameters || {};

    // Regional Context: Pakistani Providers (LESCO, KE, IESCO, SNGPL, SSGC)
    if (region === "PK" || region === "Pakistan") {
      let kgCO2e = 0;
      let unit = (safeParameters.volume_unit || safeParameters.energy_unit || safeParameters.unit || "CM").toUpperCase();
      let value = parseFloat(safeParameters.volume || safeParameters.energy || safeParameters.value || 0);

      if (isElectricity) {
        // Pakistan Grid Intensity
        kgCO2e = value * 0.425;
      } else if (isGas) {
        const hasMMBTU = unit === "MMBTU";
        if (hasMMBTU) {
          kgCO2e = value * 53.06; // Energy Content Method
        } else {
          kgCO2e = value * 1.94; // Volume-based Fallback
        }
      }

      return NextResponse.json({
        co2e: kgCO2e,
        region: "Pakistan",
        grid_mix: "Hydel/Thermal/Nuclear"
      });
    }

    // Default Fallbacks for non-Pakistan regions
    if (isGas) {
      const unit = (safeParameters.volume_unit || safeParameters.energy_unit || safeParameters.unit || "CM").toUpperCase();
      let value = parseFloat(safeParameters.volume || safeParameters.energy || safeParameters.value || 0);

      let mmbtu = 0;

      // Extract MMBTU and support fallbacks to HM3 or CM
      if (unit === "MMBTU") {
        mmbtu = value;
      } else if (unit === "HM3") {
        const cm = value * 100;
        const gcv = 990; // Typical GCV for Pakistan
        mmbtu = (cm / 28.17385) * (gcv / 1000);
      } else if (unit === "CM" || unit.includes("M3") || unit.includes("CUBIC")) {
        const cm = value;
        const gcv = 990; // Typical GCV for Pakistan
        mmbtu = (cm / 28.17385) * (gcv / 1000);
      } else {
        mmbtu = value; // Fallback assumes MMBTU
      }

      // Multiply by 53.06 to get kg CO2e
      const kgCO2e = mmbtu * 53.06;

      // Validation check for low amounts
      if (kgCO2e > 0 && kgCO2e < 10) {
        return NextResponse.json(
          { error: "Parsing Error: Result is less than 10kg CO2e for a monthly residential bill. Please check the units again." },
          { status: 400 }
        );
      }

      return NextResponse.json({ co2e: kgCO2e });
    }

    // Default to electricity handling via Climatiq
    const apiKey = process.env.CLIMATIQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const safeActivityId = "electricity-supply_grid-source_residual_mix";
    const value = safeParameters.energy || safeParameters.volume || safeParameters.value || 0;
    const formattedParams = { energy: parseFloat(value), energy_unit: "kWh" };

    const climatiqPayload = {
      emission_factor: {
        activity_id: safeActivityId,
        data_version: "^31"
      },
      parameters: formattedParams,
    };

    const response = await fetch("https://api.climatiq.io/data/v1/estimate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(climatiqPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Climatiq error:", errorData);
      return NextResponse.json(
        { error: "Failed to estimate emissions", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ co2e: data.co2e });

  } catch (error) {
    console.error("API Error (/api/calculate):", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
