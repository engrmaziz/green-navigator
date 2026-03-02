"use client";

import { useState } from "react";
import { Mail, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { MarketingNav } from "@/components/ds/MarketingNav";
import { MarketingFooter } from "@/components/ds/MarketingFooter";
import { GlowButton } from "@/components/ds/GlowButton";
import { GlassCard } from "@/components/ds/GlassCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col pt-20 bg-background text-foreground selection:bg-emerald-500/20 selection:text-white">
            <MarketingNav />

            <section className="py-24 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 min-h-[80vh] items-center">

                {/* Left Side: Copy & Info */}
                <div className="flex flex-col gap-8">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-4">
                            Let's <span className="text-emerald-500 text-glow">talk.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 font-sans leading-relaxed">
                            Whether you need a custom enterprise deployment, help with an API integration, or just want to learn more about carbon accounting.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 mt-4">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Email Us</p>
                                <p className="text-sm text-zinc-400">hello@greennavigator.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <Clock className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Response Time</p>
                                <p className="text-sm text-zinc-400">Usually under 2 hours during PST business hours.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" /></svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.59 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Right Side: Form */}
                <GlassCard className="p-8 sm:p-10 border-white/10 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-5 relative z-10"
                            >
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2 relative group">
                                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">First Name</label>
                                        <input required type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner" />
                                    </div>
                                    <div className="flex flex-col gap-2 relative group">
                                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">Last Name</label>
                                        <input required type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 relative group">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">Work Email</label>
                                    <input required type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner" />
                                </div>

                                <div className="flex flex-col gap-2 relative group">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">Topic</label>
                                    <select required className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner appearance-none cursor-pointer">
                                        <option value="" disabled selected>Select a topic...</option>
                                        <option value="sales">Sales & Enterprise Pricing</option>
                                        <option value="support">Technical Support</option>
                                        <option value="api">API Access Request</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2 relative group">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">Message</label>
                                    <textarea required rows={4} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner resize-none"></textarea>
                                </div>

                                <GlowButton type="submit" size="lg" className="w-full mt-2" isLoading={isSubmitting}>
                                    Send Message
                                </GlowButton>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-12 relative z-10"
                            >
                                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500 drop-shadow-[0_0_15px_rgba(80,200,120,0.6)]" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white mb-2">Message Sent</h3>
                                <p className="text-zinc-400">We've received your inquiry and will get back to you shortly.</p>
                                <button onClick={() => setIsSubmitted(false)} className="mt-8 text-sm font-semibold text-emerald-500 hover:text-emerald-400">
                                    Send another message
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </GlassCard>
            </section>

            <MarketingFooter />
        </div>
    );
}
