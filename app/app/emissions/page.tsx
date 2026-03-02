"use client";

import { motion } from "framer-motion";
import { Download, Filter, Search, ArrowUpDown, MoreHorizontal, Fuel, Plane, Zap, Flame } from "lucide-react";
import { GlassCard } from "@/components/ds/GlassCard";
import { GlowButton } from "@/components/ds/GlowButton";
import { AreaChart } from "@/components/ds/AreaChart";

// Dummy history data
const emissionHistory = [
    { id: "EM-0824", date: "2024-03-24", source: "Electricity", category: "Scope 2", value: "3,420", unit: "kg CO₂e", status: "Verified" },
    { id: "EM-0823", date: "2024-03-22", source: "Natural Gas", category: "Scope 1", value: "1,150", unit: "kg CO₂e", status: "Verified" },
    { id: "EM-0822", date: "2024-03-18", source: "Business Travel", category: "Scope 3", value: "890", unit: "kg CO₂e", status: "Pending" },
    { id: "EM-0821", date: "2024-03-15", source: "Electricity", category: "Scope 2", value: "3,100", unit: "kg CO₂e", status: "Verified" },
    { id: "EM-0820", date: "2024-03-10", source: "Fleet Fuel", category: "Scope 1", value: "450", unit: "kg CO₂e", status: "Verified" },
    { id: "EM-0819", date: "2024-03-05", source: "Server Hosting", category: "Scope 3", value: "320", unit: "kg CO₂e", status: "Verified" },
];

const totalTrendData = [
    { name: 'Jan', Scope1: 4000, Scope2: 2400, Scope3: 2400 },
    { name: 'Feb', Scope1: 3000, Scope2: 1398, Scope3: 2210 },
    { name: 'Mar', Scope1: 2000, Scope2: 9800, Scope3: 2290 },
    { name: 'Apr', Scope1: 2780, Scope2: 3908, Scope3: 2000 },
    { name: 'May', Scope1: 1890, Scope2: 4800, Scope3: 2181 },
    { name: 'Jun', Scope1: 2390, Scope2: 3800, Scope3: 2500 },
    { name: 'Jul', Scope1: 3490, Scope2: 4300, Scope3: 2100 },
];

export default function EmissionsPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-1">
                        Emissions Ledger
                    </h1>
                    <p className="text-zinc-400 font-sans">
                        Immutable record of all processed scopes and data points.
                    </p>
                </div>
                <div className="flex gap-3">
                    <GlowButton variant="ghost" className="border-white/10" size="sm">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </GlowButton>
                    <GlowButton variant="primary" size="sm">
                        <Download className="w-4 h-4 mr-2" /> Export CSV
                    </GlowButton>
                </div>
            </header>

            {/* GHG Trend Summary */}
            <GlassCard className="p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-display font-bold text-white">GHG Protocol Breakdown</h3>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Scope 1
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500">
                            <span className="w-2 h-2 rounded-full bg-amber-500" /> Scope 2
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#A020F0]">
                            <span className="w-2 h-2 rounded-full bg-[#A020F0]" /> Scope 3
                        </div>
                    </div>
                </div>
                <div className="w-full h-[250px] min-h-[250px] relative">
                    <AreaChart data={totalTrendData} xAxisKey="name" seriesKey="Scope1" color="var(--emerald)" height={250} />
                </div>
            </GlassCard>

            {/* Data Table */}
            <GlassCard className="overflow-hidden">
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                    <div className="relative w-64 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search records..."
                            className="w-full h-9 bg-white/5 border border-transparent focus:border-emerald-500/30 rounded-lg pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all font-sans"
                        />
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">Showing 6 of 142 records</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-white/[0.02] border-b border-white/5 text-zinc-400 font-bold uppercase tracking-widest text-[10px]">
                            <tr>
                                <th className="px-6 py-4 font-semibold flex items-center gap-1 cursor-pointer hover:text-white transition-colors">Record ID <ArrowUpDown className="w-3 h-3" /></th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Source</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold text-right">Emissions</th>
                                <th className="px-6 py-4 font-semibold text-center">Status</th>
                                <th className="px-6 py-4 font-semibold"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-sans">
                            {emissionHistory.map((row) => (
                                <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4 font-mono-data text-emerald-500/80 group-hover:text-emerald-400 font-semibold">{row.id}</td>
                                    <td className="px-6 py-4 text-zinc-300 font-mono-data">{row.date}</td>
                                    <td className="px-6 py-4 text-white font-medium flex items-center gap-2">
                                        {row.source.includes('Electricity') && <Zap className="w-4 h-4 text-amber-500" />}
                                        {row.source.includes('Gas') && <Flame className="w-4 h-4 text-orange-500" />}
                                        {(row.source.includes('Travel') || row.source.includes('Flight')) && <Plane className="w-4 h-4 text-blue-500" />}
                                        {row.source.includes('Fuel') && <Fuel className="w-4 h-4 text-zinc-400" />}
                                        {row.source}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded bg-white/5 text-zinc-300 text-xs font-semibold">{row.category}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="font-mono-data font-bold text-white mr-1">{row.value}</span>
                                        <span className="text-zinc-500 text-xs">{row.unit}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${row.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                            }`}>
                                            {row.status === 'Verified' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(80,200,120,0.8)]" />}
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-zinc-500 hover:text-white p-1 transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}
