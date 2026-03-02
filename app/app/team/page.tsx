"use client";

import { GlassCard } from "@/components/ds/GlassCard";
import { GlowButton } from "@/components/ds/GlowButton";
import { Plus, Settings, User } from "lucide-react";

export default function TeamPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-1">
                        Team Access
                    </h1>
                    <p className="text-zinc-400 font-sans">
                        Manage roles, permissions, and invite collaborators.
                    </p>
                </div>
                <div className="flex gap-3">
                    <GlowButton variant="primary" size="sm">
                        <Plus className="w-4 h-4 mr-2" /> Invite Member
                    </GlowButton>
                </div>
            </header>

            <GlassCard className="overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/[0.01]">
                    <h3 className="text-lg font-display font-bold text-white">Active Members</h3>
                </div>

                <div className="divide-y divide-white/5">
                    {[
                        { name: "Alex Chen", email: "alex@company.com", role: "Admin", status: "Active" },
                        { name: "Sarah Jenkins", email: "s.jenkins@company.com", role: "Editor", status: "Active" },
                        { name: "Michael Chang", email: "m.chang@company.com", role: "Viewer", status: "Pending" },
                    ].map((member, i) => (
                        <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 border border-white/10 group-hover:border-emerald-500/30 transition-colors">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white font-sans">{member.name}</p>
                                    <p className="text-xs text-zinc-500 font-sans">{member.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">{member.role}</p>
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 ${member.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'
                                    }`}>
                                    {member.status}
                                </span>
                                <button className="p-2 text-zinc-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-lg">
                                    <Settings className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
}
