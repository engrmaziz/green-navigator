import { NextResponse } from "next/server";
import { z } from "zod";

const billSchema = z.object({
    type: z.enum(["electricity", "gas"]),
    value: z.number(),
    unit: z.string(),
    provider: z.string().optional()
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("bill") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "Server misconfiguration: GEMINI_API_KEY is not set" },
                { status: 500 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64String = buffer.toString("base64");

        const fileMimeType = file.type || "application/pdf";

        // FIXED: The prompt now explicitly forces the AI to look for Pakistani utility data
        const prompt = `
      Extract the utility data from the attached Pakistani utility bill (LESCO, KE, IESCO, SNGPL, SSGC, etc).
      CRITICAL INSTRUCTIONS:
      1. IGNORE all currency amounts, money, "Rs.", "Rupees", "Payable", "Total Charges", or balances.
      2. For Electricity: Extract the total 'Units Consumed' in kWh. If it's a 'Web Bill' or 'Consumer Bill', look for the current month's units.
      3. For Gas: Prioritize the MMBTU value. If missing, use CM (Cubic Meters).

      Provide the result as a strict JSON object with no markdown formatting.
      The structure must be exactly:
      {
        "type": "electricity" | "gas",
        "value": number (the exact energy consumed, NOT the money),
        "unit": "kWh" | "CM" | "MMBTU" | "m3",
        "provider": string (e.g. "LESCO", "SNGPL", etc)
      }
    `;

        const payload = {
            contents: [
                {
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: fileMimeType,
                                data: base64String,
                            },
                        },
                    ],
                },
            ],
            generationConfig: {
                responseMimeType: "application/json",
            }
        };

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        );

        if (!response.ok) {
            const errData = await response.json();
            console.error("Gemini API Error details:", errData);
            return NextResponse.json(
                { error: "Failed to parse bill with Gemini", details: errData },
                { status: response.status }
            );
        }

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResponse) {
            throw new Error("No text response from Gemini");
        }

        let result;
        try {
            const rawJson = JSON.parse(textResponse.trim());
            result = billSchema.parse(rawJson);
        } catch (e) {
            try {
                const cleanedJson = JSON.parse(textResponse.replace(/```json/g, "").replace(/```/g, "").trim());
                result = billSchema.parse(cleanedJson);
            } catch (validationError) {
                console.error("Zod Validation Error:", validationError);
                return NextResponse.json({ error: "Failed to validate parsed bill data" }, { status: 400 });
            }
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("API Error (/api/parse-bill):", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}