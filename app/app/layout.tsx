"use client";

import { AppSidebar } from "@/components/ds/AppSidebar";
import { GlowButton } from "@/components/ds/GlowButton";
import { Bell, Search } from "lucide-react";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex selection:bg-emerald-500/20 selection:text-white relative">

            {/* Global Background Effects for Dashboard */}
            <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />
            <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

            {/* Sidebar Navigation */}
            <AppSidebar />

            {/* Main Content Area */}
            <main className="flex-1 ml-64 min-h-screen flex flex-col relative z-10 transition-all duration-300">

                {/* Top Bar Navigation */}
                <header className="h-20 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl sticky top-0 z-30 px-8 flex items-center justify-between">

                    {/* Search */}
                    <div className="relative w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search reports, invoices, or members..."
                            className="w-full h-10 bg-white/5 border border-transparent focus:border-emerald-500/30 rounded-lg pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 border border-white/5 text-[10px] font-sans font-semibold text-zinc-400">Ctrl</kbd>
                            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 border border-white/5 text-[10px] font-sans font-semibold text-zinc-400">K</kbd>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(80,200,120,0.8)]" />
                        </button>
                        <div className="h-6 w-px bg-white/10" />
                        <GlowButton size="sm" variant="primary">New Scan</GlowButton>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    {children}
                </div>

            </main>
        </div>
    );
}
