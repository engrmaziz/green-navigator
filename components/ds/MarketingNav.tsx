"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, Menu, X } from 'lucide-react';
import { GlowButton } from './GlowButton';
import { motion, AnimatePresence } from 'framer-motion';

export function MarketingNav() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                            <Leaf className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="font-display font-bold text-xl text-white tracking-tight">Green Navigator</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors">
                                Sign In
                            </Link>
                            <Link href="/signup">
                                <GlowButton variant="primary" size="sm">Start Free Trial</GlowButton>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-zinc-400 hover:text-white"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="fixed inset-0 z-[60] bg-[#0A0A0A]/95"
                    >
                        <div className="flex flex-col h-full p-6">
                            <div className="flex justify-between items-center mb-12">
                                <span className="font-display font-bold text-xl text-white">Menu</span>
                                <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/5">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {links.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-3xl font-display font-bold text-zinc-400 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-auto flex flex-col gap-4 pb-8">
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <GlowButton variant="ghost" className="w-full text-lg">Sign In</GlowButton>
                                </Link>
                                <Link href="/signup" onClick={() => setIsOpen(false)}>
                                    <GlowButton variant="primary" className="w-full text-lg">Start Free Trial</GlowButton>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
