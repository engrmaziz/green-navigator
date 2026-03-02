"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Sparkles } from "lucide-react";
import { MarketingNav } from "@/components/ds/MarketingNav";
import { MarketingFooter } from "@/components/ds/MarketingFooter";
import { GlowButton } from "@/components/ds/GlowButton";
import { GlassCard } from "@/components/ds/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const faqs = [
    {
        q: "How does the Location Limit work?",
        a: "A location refers to a unique physical address (like an office, retail store, or warehouse). The Starter plan gives you reporting for 1 HQ, while Growth expands that to 10 distinct physical locations."
    },
    {
        q: "Can I connect my accounting software directly?",
        a: "Yes! The Growth and Enterprise plans allow direct API integrations with QuickBooks Online and Xero to automatically parse scope 3 spending data without manual bill uploads."
    },
    {
        q: "Are the reports compliant with the GHG Protocol?",
        a: "Absolutely. Our engine strictly adheres to the GHG Protocol Corporate Accounting and Reporting Standard, and maps to the latest localized conversion factors (including EPA, DEFRA, and specific regional grids)."
    },
    {
        q: "Do you offer a free trial?",
        a: "Yes, all new accounts start with a fully-featured 14-day free trial of the Growth plan. No credit card required upfront."
    }
];

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <div className="min-h-screen flex flex-col pt-20 bg-background text-foreground selection:bg-emerald-500/20 selection:text-white">
            <MarketingNav />

            {/* Hero */}
            <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white mb-6">
                    Simple pricing. <br /> <span className="text-emerald-500 text-glow">No surprises.</span>
                </h1>

                {/* Toggle */}
                <div className="flex items-center gap-4 mt-8 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <button
                        onClick={() => setIsAnnual(false)}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${!isAnnual ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setIsAnnual(true)}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${isAnnual ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(80,200,120,0.3)]' : 'text-zinc-400 hover:text-white'}`}
                    >
                        Annually
                        {isAnnual && <span className="text-[10px] uppercase tracking-widest bg-black/20 text-black px-2 py-0.5 rounded flex items-center gap-1"><Sparkles className="w-3 h-3" /> Save 20%</span>}
                    </button>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-32 px-6 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">

                    {/* Starter */}
                    <GlassCard className="h-full flex flex-col border-white/5">
                        <h3 className="text-xl font-display font-bold text-white mb-2">Starter</h3>
                        <p className="text-sm text-zinc-400 mb-6">Perfect for single-office companies.</p>
                        <div className="mb-8 border-b border-white/10 pb-8">
                            <span className="text-5xl font-display font-bold text-white tracking-tighter">${isAnnual ? '39' : '49'}</span>
                            <span className="text-zinc-500"> /mo</span>
                        </div>
                        <ul className="flex flex-col gap-4 mb-8 flex-1">
                            {["1 physical location", "3 user seats", "Basic GHG reports", "Email support"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span className="text-zinc-300 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <GlowButton variant="ghost" className="w-full border-white/10">Start Starter Trial</GlowButton>
                    </GlassCard>

                    {/* Growth (Most Popular) */}
                    <GlassCard glow="emerald" className="h-full flex flex-col relative scale-100 md:scale-105 z-10 border-emerald-500/50 shadow-[0_0_50px_rgba(80,200,120,0.1)]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-emerald-500 text-black text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(80,200,120,0.5)]">
                            Most Popular
                        </div>
                        <h3 className="text-xl font-display font-bold text-emerald-400 mb-2 mt-2">Growth</h3>
                        <p className="text-sm text-zinc-400 mb-6">For multi-location scaling SMBs.</p>
                        <div className="mb-8 border-b border-white/10 pb-8">
                            <span className="text-5xl font-display font-bold text-white tracking-tighter">${isAnnual ? '119' : '149'}</span>
                            <span className="text-zinc-500"> /mo</span>
                        </div>
                        <ul className="flex flex-col gap-4 mb-8 flex-1">
                            {["Up to 10 locations", "25 user seats", "Advanced reports + Scope 3", "API Access", "Priority support"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span className="text-zinc-100 text-sm font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <GlowButton className="w-full">Start Growth Trial</GlowButton>
                    </GlassCard>

                    {/* Enterprise */}
                    <GlassCard className="h-full flex flex-col border-white/5 bg-[#050505]">
                        <h3 className="text-xl font-display font-bold text-white mb-2">Enterprise</h3>
                        <p className="text-sm text-zinc-400 mb-6">For complex corporate structures.</p>
                        <div className="mb-8 border-b border-white/10 pb-8">
                            <span className="text-4xl font-display font-bold text-white tracking-tighter mt-1 block">Custom</span>
                            <span className="text-zinc-500 opacity-0 mb-1 block"> /mo</span>
                        </div>
                        <ul className="flex flex-col gap-4 mb-8 flex-1">
                            {["Unlimited locations", "Unlimited seats", "Custom API Integrations", "Dedicated Account Manager", "Custom Report Branding"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span className="text-zinc-300 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <GlowButton variant="ghost" className="w-full border-white/10">Contact Sales</GlowButton>
                    </GlassCard>

                </div>
            </section>

            {/* FAQ */}
            <section className="pb-32 px-6 max-w-4xl mx-auto w-full">
                <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Frequently asked questions</h2>
                <div className="flex flex-col gap-4">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </section>

            {/* Enterprise / Support CTA */}
            <section className="py-24 border-t border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(80,200,120,0.05),transparent_50%)]">
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter mb-6">Need more than 10 locations?</h2>
                    <p className="text-zinc-400 mb-8 max-w-lg">Our engineering team can help set up a custom deployment tailored to your specific corporate hierarchy.</p>
                    <Link href="/contact">
                        <GlowButton>Book a Custom Demo</GlowButton>
                    </Link>
                </div>
            </section>

            <MarketingFooter />
        </div>
    );
}

function FAQItem({ q, a }: { q: string, a: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
            >
                <span className="font-display font-semibold text-white">{q}</span>
                <ChevronDown className={`w-5 h-5 text-emerald-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="p-6 pt-0 text-zinc-400 text-sm leading-relaxed border-t border-white/5 mt-2 pt-4">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
