"use client";

import { GlassCard } from "@/components/ds/GlassCard";
import { GlowButton } from "@/components/ds/GlowButton";
import { Download, FileText, Share2 } from "lucide-react";

export default function ReportsPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-1">
                        Compliance Reports
                    </h1>
                    <p className="text-zinc-400 font-sans">
                        Generate SEC-ready and regional carbon disclosures.
                    </p>
                </div>
                <div className="flex gap-3">
                    <GlowButton variant="primary" size="sm">
                        <FileText className="w-4 h-4 mr-2" /> Generate Report
                    </GlowButton>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Q1 2024 GHG Summary", type: "Internal Audit", date: "April 1, 2024", status: "Ready" },
                    { title: "2023 SEC Disclosure", type: "Regulatory", date: "Feb 15, 2024", status: "Published" },
                    { title: "Supply Chain Impact (Scope 3)", type: "Custom Analysis", date: "Jan 10, 2024", status: "Ready" },
                ].map((report, i) => (
                    <GlassCard key={i} className="p-6 flex flex-col group hover:border-emerald-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-white/5 rounded-xl text-zinc-400 group-hover:text-emerald-500 transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                                {report.status}
                            </span>
                        </div>

                        <h3 className="text-lg font-display font-bold text-white mb-1">{report.title}</h3>
                        <p className="text-sm text-zinc-400 font-sans mb-6">{report.type}</p>

                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-xs font-mono-data text-zinc-500">{report.date}</span>
                            <div className="flex gap-2">
                                <button className="p-2 text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-lg">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-emerald-500 hover:text-black rounded-lg">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <GlassCard className="p-12 text-center mt-12 bg-[url('/noise.svg')] bg-cover relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 max-w-md mx-auto">
                    <h3 className="text-xl font-display font-bold text-white mb-2">Need a Custom Framework?</h3>
                    <p className="text-sm text-zinc-400 font-sans mb-8">
                        Our compliance engine supports custom regional standards beyond SEC and GHG Protocol. Let our team map your requirements.
                    </p>
                    <GlowButton variant="ghost" className="border-white/20">Contact Enterprise Support</GlowButton>
                </div>
            </GlassCard>
        </div>
    );
}
