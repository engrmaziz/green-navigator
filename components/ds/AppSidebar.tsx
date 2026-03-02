"use client";

import React from 'react';
import Link from 'next/link';
import { Leaf, LayoutDashboard, FileText, Settings, Users, ArrowRight, FolderOpen, Flame } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function AppSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
        { name: 'Emissions', href: '/app/emissions', icon: Flame },
        { name: 'Documents', href: '/app/documents', icon: FolderOpen },
        { name: 'Reports', href: '/app/reports', icon: FileText },
        { name: 'Team', href: '/app/team', icon: Users },
        { name: 'Settings', href: '/app/settings', icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0E0E0E] border-r border-white/5 flex flex-col z-40">

            {/* Brand */}
            <div className="h-20 flex items-center px-6 border-b border-white/5">
                <Link href="/app/dashboard" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                        <Leaf className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="font-display font-bold text-lg text-white">Green Navigator</span>
                </Link>
            </div>

            {/* Nav Menu */}
            <div className="flex-1 py-8 px-4 flex flex-col gap-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100")} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* User Footer */}
            <div className="p-4 border-t border-white/5 mt-auto">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col gap-3 group hover:border-emerald-500/20 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(80,200,120,0.3)]">
                                JS
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-white font-semibold">Jane Smith</span>
                                <span className="text-xs text-zinc-500">Acme Corp</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-1 rounded w-fit">Free Trial</span>
                        <span className="text-xs text-white flex items-center gap-1 group-hover:text-emerald-400">Upgrade <ArrowRight className="w-3 h-3" /></span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
