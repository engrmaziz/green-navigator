"use client";

import { GlassCard } from "@/components/ds/GlassCard";
import { GlowButton } from "@/components/ds/GlowButton";
import { Save, Shield, Bell, Key, Zap, Building2 } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-1">
                        Workspace Settings
                    </h1>
                    <p className="text-zinc-400 font-sans">
                        Manage your company profile, billing, and integrations.
                    </p>
                </div>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Navigation */}
                <div className="w-full md:w-64 shrink-0 space-y-1">
                    {[
                        { name: "General", icon: Building2, active: true },
                        { name: "Security", icon: Shield, active: false },
                        { name: "Notifications", icon: Bell, active: false },
                        { name: "API & Integrations", icon: Zap, active: false },
                        { name: "Billing", icon: Key, active: false },
                    ].map((tab, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${tab.active
                                    ? "bg-emerald-500/10 text-emerald-500"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    <GlassCard className="p-6">
                        <h3 className="text-lg font-display font-bold text-white mb-6">Company Profile</h3>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Company Name</label>
                                <input
                                    type="text"
                                    defaultValue="Acme Corp"
                                    className="w-full h-11 bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Primary Industry</label>
                                <select className="w-full h-11 bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 text-white focus:outline-none transition-all font-sans appearance-none">
                                    <option>Manufacturing</option>
                                    <option>Software</option>
                                    <option>Retail</option>
                                    <option>Logistics</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">HQ Location</label>
                                    <input
                                        type="text"
                                        defaultValue="Lahore, PK"
                                        className="w-full h-11 bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Employee Count</label>
                                    <input
                                        type="number"
                                        defaultValue="250"
                                        className="w-full h-11 bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                            <GlowButton variant="primary" size="sm">
                                <Save className="w-4 h-4 mr-2" /> Save Changes
                            </GlowButton>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 border-red-500/20 bg-red-500/[0.02]">
                        <h3 className="text-lg font-display font-bold text-red-500 mb-2">Danger Zone</h3>
                        <p className="text-sm text-zinc-400 font-sans mb-6">Irreversible actions regarding your workspace data.</p>
                        <GlowButton variant="danger" size="sm">
                            Delete Workspace
                        </GlowButton>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
