import React from 'react';
import Link from 'next/link';
import { Leaf, ArrowRight } from 'lucide-react';

export function MarketingFooter() {
    return (
        <footer className="bg-[#080808] border-t border-white/5 pt-24 pb-12 w-full">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-16">

                    {/* Column 1: Brand */}
                    <div className="flex flex-col gap-6 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                <Leaf className="w-4 h-4 text-emerald-500" />
                            </div>
                            <span className="font-display font-bold text-lg text-white">Green Navigator</span>
                        </Link>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Carbon reporting finally made simple for modern SMBs. Turn utility bills into audit-ready emissions reports in minutes.
                        </p>
                    </div>

                    {/* Column 2: Product */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-display font-semibold text-white tracking-wide">Product</h4>
                        <Link href="/features" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors w-fit">Features</Link>
                        <Link href="/app/dashboard" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors w-fit">Dashboard</Link>
                        <Link href="/app/reports" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors w-fit">GHG Reports</Link>
                        <Link href="/app/documents" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors w-fit">Document AI</Link>
                        <Link href="/api" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors w-fit flex items-center gap-2">
                            API Access <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Beta</span>
                        </Link>
                    </div>

                    {/* Column 3: Company */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-display font-semibold text-white tracking-wide">Company</h4>
                        <Link href="/about" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors w-fit">About Us</Link>
                        <Link href="/blog" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors w-fit">Blog</Link>
                        <Link href="/contact" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors w-fit">Contact</Link>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="flex flex-col gap-4 md:col-span-1">
                        <h4 className="font-display font-semibold text-white tracking-wide">Stay Updated</h4>
                        <p className="text-sm text-zinc-400">Monthly insights on carbon compliance and sustainability.</p>
                        <form className="mt-2 flex items-center relative group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl h-11 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-emerald-500 rounded-md flex items-center justify-center text-white hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(80,200,120,0.4)] transition-all"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                        <p className="text-[11px] text-zinc-600 font-sans tracking-wide">No spam. Carbon insights only.</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500 font-sans">© 2026 Green Navigator Inc. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-4">
                            <Link href="/privacy" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Terms of Service</Link>
                        </div>

                        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                            <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                SOC2 Type II
                            </div>
                            <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                ISO 14064
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
