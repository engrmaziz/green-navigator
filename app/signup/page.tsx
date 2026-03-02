"use client";

import Link from "next/link";
import { Leaf, ArrowRight, ArrowLeft } from "lucide-react";
import { GlowButton } from "@/components/ds/GlowButton";
import { GlassCard } from "@/components/ds/GlassCard";
import { motion } from "framer-motion";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex bg-background text-foreground selection:bg-emerald-500/20 selection:text-white">

            {/* Left Pane: Form (55%) */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-12 relative z-10 bg-[#0A0A0A]">

                <Link href="/" className="absolute top-12 left-8 md:left-16 lg:left-24 text-sm font-semibold text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                {/* Brand Header */}
                <div className="mb-12">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                        <Leaf className="w-6 h-6 text-emerald-500 shadow-[0_0_15px_rgba(80,200,120,0.5)]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-2">Start your free trial</h1>
                    <p className="text-zinc-400 font-sans">Get 14 days of full Growth plan access. No card required.</p>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); window.location.href = '/onboarding'; }}>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2 relative group">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">First Name</label>
                            <input required type="text" placeholder="Jane" className="w-full bg-white/[0.04] border border-white/10 rounded-xl h-14 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-[3px] focus:ring-emerald-500/15 transition-all shadow-inner font-sans" />
                        </div>
                        <div className="flex flex-col gap-2 relative group">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">Last Name</label>
                            <input required type="text" placeholder="Smith" className="w-full bg-white/[0.04] border border-white/10 rounded-xl h-14 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-[3px] focus:ring-emerald-500/15 transition-all shadow-inner font-sans" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 group">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">Work Email</label>
                        <input required type="email" placeholder="name@company.com" className="w-full bg-white/[0.04] border border-white/10 rounded-xl h-14 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-[3px] focus:ring-emerald-500/15 transition-all shadow-inner font-mono-data" />
                    </div>

                    <div className="flex flex-col gap-2 group">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">Password</label>
                        <input required type="password" placeholder="••••••••" className="w-full bg-white/[0.04] border border-white/10 rounded-xl h-14 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-[3px] focus:ring-emerald-500/15 transition-all shadow-inner font-mono-data tracking-[0.2em]" />
                        <p className="text-[11px] text-zinc-600 mt-1">Must be at least 8 characters.</p>
                    </div>

                    <GlowButton type="submit" size="lg" className="w-full mt-2">
                        Create Account <ArrowRight className="w-4 h-4 ml-2" />
                    </GlowButton>

                    <div className="relative py-4 flex items-center">
                        <div className="flex-grow border-t border-white/10"></div>
                        <span className="flex-shrink-0 mx-4 text-xs text-zinc-600 uppercase tracking-widest font-bold">or sign up with</span>
                        <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    <GlowButton variant="ghost" size="lg" className="w-full border-white/10 bg-white/[0.02]">
                        {/* SVG Google Logo */}
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /><path fill="none" d="M1 1h22v22H1z" /></svg>
                        Google
                    </GlowButton>

                    <p className="text-[11px] text-zinc-500 text-center leading-relaxed mt-4">
                        By creating an account, you agree to our <Link className="underline hover:text-white" href="#">Terms of Service</Link> and <Link className="underline hover:text-white" href="#">Privacy Policy</Link>.
                    </p>

                </form>

                <p className="mt-8 text-center text-sm text-zinc-500 font-sans">
                    Already have an account? <Link href="/login" className="text-emerald-500 font-semibold hover:text-emerald-400">Sign In</Link>
                </p>

            </div>

            {/* Right Pane: Social Proof/Features (45%) */}
            <div className="hidden lg:flex flex-col w-[45%] relative overflow-hidden bg-[#050B08] border-l border-white/5 items-center justify-center p-12">

                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />

                <div className="max-w-md z-10 w-full">
                    <h2 className="text-3xl font-display font-bold text-white mb-8">Join the easiest carbon reporting platform.</h2>

                    <div className="flex flex-col gap-6">
                        {[
                            { title: "No credit card needed", desc: "Start exploring the platform immediately." },
                            { title: "Drop utility bills", desc: "Our AI extracts necessary data in seconds." },
                            { title: "Export instantly", desc: "Generate GHG Protocol PDFs effortlessly." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                                    <span className="text-emerald-500 font-bold text-sm">{i + 1}</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-display font-bold text-white tracking-tight">{item.title}</h4>
                                    <p className="text-sm text-zinc-400 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-16 p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative"
                    >
                        <div className="absolute -top-3 left-6 text-4xl text-emerald-500/30 font-display font-black leading-none">"</div>
                        <p className="text-zinc-300 italic text-sm leading-relaxed mb-4 relative z-10 pt-2">
                            We used to spend two weeks compiling energy data manually across our 5 offices. Green Navigator reduced that to 20 minutes. It's fundamentally changed our workflow.
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-zinc-700 to-zinc-900 border border-white/10" />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-white">David Miller</span>
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">VP Ops, Vertex</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
