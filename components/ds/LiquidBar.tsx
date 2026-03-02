import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

interface LiquidBarProps {
    label: string;
    value: number; // 0 to 100
    max?: number; // default 100
    colorPrefix?: 'emerald' | 'amber' | 'red';
    showWarningThreshold?: number; // e.g. 80. Above this, turns amber/red
    delay?: number;
}

export function LiquidBar({
    label,
    value,
    max = 100,
    colorPrefix = 'emerald',
    showWarningThreshold = 80,
    delay = 0
}: LiquidBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    // Dynamic color threshold logic
    let activeColor = colorPrefix;
    let isDanger = false;

    if (showWarningThreshold && percentage >= showWarningThreshold) {
        if (percentage >= 100) {
            activeColor = 'red';
            isDanger = true;
        } else {
            activeColor = 'amber';
        }
    }

    const colorVariants = {
        emerald: {
            bg: 'bg-emerald-500/10',
            fill: 'bg-gradient-to-r from-emerald-600 to-emerald-400',
            glow: 'shadow-[0_0_20px_rgba(80,200,120,0.6)]',
            text: 'text-emerald-400'
        },
        amber: {
            bg: 'bg-amber-500/10',
            fill: 'bg-gradient-to-r from-amber-600 to-amber-400',
            glow: 'shadow-[0_0_20px_rgba(255,179,71,0.6)]',
            text: 'text-amber-400'
        },
        red: {
            bg: 'bg-red-500/10',
            fill: 'bg-gradient-to-r from-red-600 to-red-500',
            glow: 'shadow-[0_0_20px_rgba(255,82,82,0.8)]',
            text: 'text-red-400'
        }
    };

    const style = colorVariants[activeColor as keyof typeof colorVariants];

    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                    {isDanger && <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />}
                    <span className="text-sm font-semibold text-zinc-300 tracking-wide">{label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className={cn("font-mono font-medium", style.text)}>
                        {value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                    </span>
                    <span className="text-xs text-zinc-500">/ {max}</span>
                </div>
            </div>

            {/* Track */}
            <div className="h-3 w-full backdrop-blur-md bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                {/* Fill */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
                    className={cn("absolute top-0 left-0 h-full rounded-full relative", style.fill, style.glow)}
                >
                    {/* Traveling Glow Edge */}
                    <div className="absolute top-0 right-0 w-8 h-full bg-white/40 blur-sm rounded-full" />
                </motion.div>
            </div>
        </div>
    );
}
