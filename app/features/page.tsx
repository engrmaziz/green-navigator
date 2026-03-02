"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MarketingNav } from "@/components/ds/MarketingNav";
import { MarketingFooter } from "@/components/ds/MarketingFooter";
import { GlowButton } from "@/components/ds/GlowButton";
import { GlassCard } from "@/components/ds/GlassCard";

const features = [
    {
        title: "AI Document Parsing",
        tag: "Time Saver",
        benefits: [
            "Drop any PDF, JPG, or PNG utility bill.",
            "Gemini OCR natively extracts energy units, ignoring non-essential currencies.",
            "Processes messy, unstructured data in milliseconds."
        ],
        mockup: "Extraction Mockup Area"
    },
    {
        title: "Multi-Scope Emissions Tracking",
        tag: "Compliance",
        benefits: [
            "Automatically map energy to Scope 1, 2, or 3.",
            "Supports Natural Gas, Electricity, and Flight travel categories.",
            "Live updating donut charts breaking down your footprint."
        ],
        mockup: "Scope Breakdown Mockup Area"
    },
    {
        title: "GHG Protocol Reports",
        tag: "Audit-Ready",
        benefits: [
            "Generate standard PDF reports with a single click.",
            "Compatible with ISO 14064 and GHG Protocol requirements.",
            "Export raw data directly to CSV for custom internal analysis."
        ],
        mockup: "Report PDF Mockup Area"
    },
    {
        title: "Team Collaboration",
        tag: "Security",
        benefits: [
            "Granular role-based access control (Admin, Editor, Viewer).",
            "Restrict specific regional data to branch managers.",
            "Complete immutable audit trail of who uploaded what."
        ],
        mockup: "Team Permissions Mockup Area"
    }
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen flex flex-col pt-20 bg-background text-foreground selection:bg-emerald-500/20 selection:text-white">
            <MarketingNav />

            {/* Hero */}
            <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-6">
                    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white">
                        Built for <span className="text-emerald-500 text-glow">real businesses,</span> not enterprise teams.
                    </h1>
                    <p className="text-xl text-zinc-400 font-sans max-w-lg leading-relaxed">
                        Forget complex spreadsheets and six-month implementation cycles. Green Navigator is ready to track your emissions from day one.
                    </p>
                    <div className="mt-4">
                        <Link href="/signup">
                            <GlowButton size="lg">Start Free Trial</GlowButton>
                        </Link>
                    </div>
                </div>

                {/* Animated Feature Highlight (Static placeholder for layout) */}
                <div className="relative w-full h-[400px] border border-white/10 bg-white/[0.02] rounded-3xl flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <GlassCard glow="emerald" className="w-[300px]">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">1</div>
                                <div>
                                    <p className="text-sm font-semibold text-white">Upload Bill</p>
                                    <p className="text-xs text-zinc-400">Processing with AI...</p>
                                </div>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(80,200,120,0.5)]" />
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </section>

            {/* Deep Dives */}
            <section className="py-24 max-w-7xl mx-auto w-full px-6 flex flex-col gap-32">
                {features.map((feature, i) => {
                    const isEven = i % 2 !== 0; // Alternating layout
                    return (
                        <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>

                            <div className={`flex flex-col gap-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded w-fit">
                                    {feature.tag}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                                    {feature.title}
                                </h2>
                                <ul className="flex flex-col gap-4 mt-2">
                                    {feature.benefits.map((benefit, j) => (
                                        <li key={j} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-zinc-300 font-sans">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={`relative w-full aspect-square md:aspect-video lg:aspect-square bg-white/[0.02] border border-white/10 rounded-3xl flex items-center justify-center p-8 shadow-[inset_0_0_40px_rgba(255,255,255,0.02)] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                                {/* Decorative Glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-emerald-500/5 blur-3xl rounded-full" />

                                {/* Mockup Frame */}
                                <GlassCard className="w-full max-w-sm relative z-10 border-white/20">
                                    <p className="text-zinc-500 text-sm font-mono text-center py-12">{feature.mockup}</p>
                                </GlassCard>
                            </div>

                        </div>
                    );
                })}
            </section>

            {/* Integrations */}
            <section className="py-32 border-t border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-display font-bold text-white mb-12">Plays nice with your existing tools.</h2>
                    <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Dummy Logos */}
                        <span className="text-2xl font-display font-bold text-white tracking-tighter">QuickBooks</span>
                        <span className="text-2xl font-display font-bold text-white tracking-tighter">Xero</span>
                        <span className="text-2xl font-display font-bold text-white tracking-tighter text-blue-400">Salesforce</span>
                        <span className="text-2xl font-display font-bold text-white tracking-tighter text-amber-500">Zapier</span>
                    </div>
                </div>
            </section>

            <MarketingFooter />
        </div>
    );
}
