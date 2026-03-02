"use client";

import { Leaf, Linkedin, ShieldCheck, Scale, Telescope, Lock } from "lucide-react";
import { MarketingNav } from "@/components/ds/MarketingNav";
import { MarketingFooter } from "@/components/ds/MarketingFooter";
import { GlassCard } from "@/components/ds/GlassCard";

const team = [
    { name: "Dr. Elena Vance", role: "Chief Executive Officer", bg: "from-emerald-500/20 to-emerald-700/20" },
    { name: "Marcus Chen", role: "Chief Technology Officer", bg: "from-blue-500/20 to-indigo-700/20" },
    { name: "Sarah Jenkins", role: "VP of Sustainability", bg: "from-amber-500/20 to-orange-700/20" }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col pt-20 bg-background text-foreground selection:bg-emerald-500/20 selection:text-white">
            <MarketingNav />

            {/* Hero */}
            <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[250px] font-display font-black text-white/[0.02] tracking-tighter whitespace-nowrap pointer-events-none select-none">
                    MISSION
                </div>

                <h1 className="text-4xl md:text-6xl max-w-4xl text-center font-display font-bold tracking-tighter text-white leading-tight z-10">
                    We built Green Navigator because <span className="text-emerald-500 text-glow">SMBs deserve</span> the same compliance tools as Fortune 500s.
                </h1>
            </section>

            {/* Values Grid */}
            <section className="py-24 px-6 max-w-7xl mx-auto w-full border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Telescope, title: "Transparency", desc: "No black box math. Every calculation is traceable to an official conversion factor." },
                        { icon: Scale, title: "Accessibility", desc: "Enterprise-grade reporting priced for 50-person businesses, not 50,000-person corps." },
                        { icon: ShieldCheck, title: "Science-Backed", desc: "Built alongside climate scientists. Aligned with GHG Protocol and ISO 14064." },
                        { icon: Lock, title: "Privacy-First", desc: "Your data is hash-logged and encrypted. We don't sell insights." }
                    ].map((val, i) => {
                        const Icon = val.icon;
                        return (
                            <GlassCard key={i} className="glass-card-hover border-white/5">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                                    <Icon className="w-6 h-6 text-emerald-500 drop-shadow-[0_0_8px_rgba(80,200,120,0.5)]" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-white mb-2">{val.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">{val.desc}</p>
                            </GlassCard>
                        )
                    })}
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 px-6 max-w-3xl mx-auto w-full">
                <h2 className="text-3xl font-display font-bold text-white mb-16 text-center">Our Journey</h2>
                <div className="flex flex-col gap-12 relative border-l-2 border-emerald-500/30 pl-8 ml-4 md:ml-0">
                    {[
                        { year: "2023", title: "Founded in Seattle", desc: "Two engineers realized processing scope 3 data shouldn't take a master's degree." },
                        { year: "2024", title: "First 100 Customers", desc: "Launched MVP focusing purely on automating utility bill extractions." },
                        { year: "2025", title: "SOC2 Compliance", desc: "Achieved enterprise-grade security certifications and launched API." },
                        { year: "2026", title: "1,200+ SMBs", desc: "Currently processing over 1 Million kg of CO₂e metrics monthly." }
                    ].map((milestone, i) => (
                        <div key={i} className="relative">
                            {/* Node Dot */}
                            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-4 border-emerald-500 shadow-[0_0_15px_rgba(80,200,120,0.4)]" />

                            <span className="text-emerald-500 text-sm font-bold tracking-widest uppercase mb-1 block">{milestone.year}</span>
                            <h3 className="text-2xl font-display font-bold text-white mb-2">{milestone.title}</h3>
                            <p className="text-zinc-400">{milestone.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="py-32 px-6 max-w-7xl mx-auto w-full border-t border-white/5 bg-white/[0.01]">
                <h2 className="text-4xl font-display font-bold text-white mb-16 text-center">Meet the team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {team.map((member, i) => (
                        <GlassCard key={i} className="flex flex-col items-center text-center group">
                            <div className={`w-32 h-32 rounded-full mb-6 bg-gradient-to-br ${member.bg} flex items-center justify-center border-2 border-white/10 group-hover:border-emerald-500/50 transition-colors relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                                <span className="text-4xl text-white font-display font-bold relative z-10">{member.name.charAt(0)}{member.name.split(' ')[1].charAt(0)}</span>
                            </div>
                            <h3 className="text-xl font-display font-bold text-white">{member.name}</h3>
                            <p className="text-emerald-500 text-sm font-medium mb-6">{member.role}</p>

                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors pointer-events-auto cursor-pointer">
                                <Linkedin className="w-4 h-4" />
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </section>

            <MarketingFooter />
        </div>
    );
}
