"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Zap, Flame, Plane, TrendingDown, Leaf, AlertCircle, Loader2, FileText, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { GlassCard } from "@/components/ds/GlassCard";
import { MetricTile } from "@/components/ds/MetricTile";
import { AreaChart } from "@/components/ds/AreaChart";
import { DonutChart } from "@/components/ds/DonutChart";

interface EmissionsData {
    electricity: number;
    gas: number;
    travel: number;
}

export default function DashboardPage() {
    const [profile, setProfile] = useState<{ companyName?: string; location?: string } | null>(null);

    // Initial baseline data
    const [emissions, setEmissions] = useState<EmissionsData>({
        electricity: 1420,  // Base starting data instead of 0 for aesthetic
        gas: 850,
        travel: 210,
    });

    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("green_navigator_profile");
        if (stored) {
            try {
                setProfile(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse profile");
            }
        }
    }, []);

    const totalEmissions = emissions.electricity + emissions.gas + emissions.travel;
    const isHealthy = totalEmissions < 5000;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setIsUploading(true);

        try {
            toast.info("Analyzing utility bill...");

            const formData = new FormData();
            formData.append("bill", file);

            // Step 1: Parse bill using Gemini
            const parseRes = await fetch("/api/parse-bill", {
                method: "POST",
                body: formData,
            });

            if (!parseRes.ok) throw new Error("Failed to parse bill");
            const parsedData = await parseRes.json();

            const rawCategory = String(parsedData.type || "electricity").toLowerCase().trim();
            const validCategory = (rawCategory === "gas" || rawCategory === "travel") ? rawCategory : "electricity";

            toast.success(`Detected ${validCategory} bill: ${parsedData.value || "unknown"} ${parsedData.unit || ""}`);
            toast.info("Calculating carbon equivalent...");

            // Step 2: Calculate with Climatiq
            const calcPayload = {
                activity_id: validCategory,
                parameters: {
                    energy: parsedData.value || 1000,
                    energy_unit: parsedData.unit || "kWh",
                }
            };

            const calcRes = await fetch("/api/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(calcPayload)
            });

            if (!calcRes.ok) throw new Error("Failed to calculate CO2e");

            const calcData = await calcRes.json();
            const addedCO2e = Math.round(calcData.co2e || 0);

            // Step 3: Update state
            setEmissions(prev => ({
                ...prev,
                [validCategory]: prev[validCategory as keyof EmissionsData] + addedCO2e
            }));

            toast.success(`+${addedCO2e} kg CO2e added to ${validCategory}!`);

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "An error occurred during processing");
        } finally {
            setIsUploading(false);
            e.target.value = "";
        }
    };

    // Dummy data for charts
    const trendData = [
        { name: 'Jan', value: 2400 },
        { name: 'Feb', value: 1398 },
        { name: 'Mar', value: 9800 },
        { name: 'Apr', value: 3908 },
        { name: 'May', value: 4800 },
        { name: 'Jun', value: 3800 },
        { name: 'Jul', value: 4300 },
    ];

    const donutData = [
        { name: 'Electricity', value: emissions.electricity, color: '#50C878' },
        { name: 'Gas', value: emissions.gas, color: '#FFB347' },
        { name: 'Travel', value: emissions.travel, color: '#A020F0' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight text-white">
                        {profile?.companyName ? `${profile.companyName} Overview` : "Emissions Overview"}
                    </h1>
                    <p className="text-zinc-400 mt-1 font-sans">
                        Track, analyze, and offset your scope 1-3 footprint.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shadow-[0_0_15px_rgba(80,200,120,0.15)]">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Real-time Sync Active</span>
                </div>
            </header>

            {/* Top Metric Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricTile
                    title="Total Footprint (YTD)"
                    value={`${totalEmissions.toLocaleString()}`}
                    unit="kg CO₂e"
                    delta="-12%"
                    deltaType="positive"
                    icon={Leaf}
                    className="md:col-span-2 shadow-2xl"
                />
                <MetricTile
                    title="Energy Intensity"
                    value="42.8"
                    unit="kWh/sqft"
                    delta="+2.4%"
                    deltaType="negative"
                    icon={Zap}
                />
                <MetricTile
                    title="Offset Status"
                    value="100%"
                    unit="Achieved"
                    delta="Verified"
                    deltaType="neutral"
                    icon={TrendingDown}
                />
            </div>

            {/* Main Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Main Chart */}
                <GlassCard className="lg:col-span-8 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-display font-bold text-white">Emissions Trend</h3>
                        <span className="text-xs text-zinc-500 font-sans">Last 7 Months</span>
                    </div>
                    <div className="flex-1 w-full min-h-[300px] h-[300px] relative">
                        <AreaChart data={trendData} color="var(--emerald)" height={300} />
                    </div>
                </GlassCard>

                {/* Dropzone & Breakdown Column */}
                <div className="lg:col-span-4 flex flex-col gap-6">

                    {/* Upload Area */}
                    <GlassCard className="relative overflow-hidden group border-dashed border-white/20 p-6 flex-1 min-h-[160px] flex items-center justify-center bg-white/[0.01] hover:bg-white/[0.04] transition-colors cursor-pointer">
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            accept="image/*,application/pdf"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                        />
                        <div className={`absolute inset-0 bg-emerald-500/10 transition-opacity ${isUploading ? 'opacity-100' : 'opacity-0'} z-0`}></div>

                        {isUploading ? (
                            <div className="flex flex-col items-center gap-3 relative z-10 mix-blend-plus-lighter">
                                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                                <span className="text-sm font-bold tracking-widest uppercase text-emerald-500 animate-pulse">Running AI Agent...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3 text-zinc-500 group-hover:text-emerald-500 transition-colors relative z-10 text-center">
                                <div className="p-4 bg-black/40 rounded-full shadow-inner ring-1 ring-white/10 group-hover:ring-emerald-500/30 transition-all">
                                    <UploadCloud className="w-8 h-8 group-hover:drop-shadow-[0_0_8px_rgba(80,200,120,0.8)]" />
                                </div>
                                <span className="text-sm font-semibold font-sans">Drop Utility Bill (PDF/Img)</span>
                                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Auto-Extraction Enabled</span>
                            </div>
                        )}
                    </GlassCard>

                    {/* Donut Distribution */}
                    <GlassCard className="p-6">
                        <h3 className="text-sm font-display font-bold text-white mb-6">Source Breakdown</h3>
                        <div className="h-[200px] min-h-[200px] relative">
                            <DonutChart data={donutData} totalLabel="kg CO₂e" />
                        </div>
                    </GlassCard>

                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Active Anomalies List */}
                <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-display font-bold text-white">Recent Alerts</h3>
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { icon: Flame, text: "Natural gas anomaly (+15%) at Facility A", severity: "amber", time: "2h ago" },
                            { icon: AlertCircle, text: "Missing Scope 3 supply chain data for Q2", severity: "red", time: "1d ago" },
                            { icon: Zap, text: "Unusual off-hours electricity draw detected", severity: "zinc", time: "3d ago" },
                        ].map((alert, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-${alert.severity}-500/10 text-${alert.severity}-500`}>
                                        <alert.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm text-zinc-300 font-sans group-hover:text-white transition-colors">{alert.text}</span>
                                </div>
                                <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{alert.time}</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Scans list */}
                <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-display font-bold text-white">Recent AI Scans</h3>
                        <button className="text-xs text-emerald-500 hover:text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                            View All <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "LESCO_March_2024.pdf", type: "Electricity", value: "3,240 kWh", status: "Extracted" },
                            { name: "SNGPL_HQ_Bill.jpg", type: "Natural Gas", value: "128 MMBTU", status: "Extracted" },
                            { name: "Emirates_Flight_Summary.pdf", type: "Travel", value: "14,000 mi", status: "Review Needed" },
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] rounded-lg transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded bg-white/5 text-zinc-400 group-hover:text-white transition-colors">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-white">{doc.name}</span>
                                        <span className="text-xs text-zinc-500">{doc.type}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-mono-data text-sm text-white">{doc.value}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${doc.status === 'Extracted' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {doc.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

            </div>
        </div>
    );
}