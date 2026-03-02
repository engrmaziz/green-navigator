"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricTileProps {
    label?: string;
    title?: string;
    value: string | number;
    unit?: string;
    delta?: string | number;
    deltaType?: 'positive' | 'negative' | 'neutral' | 'positive_good' | 'negative_good';
    delay?: number;
    icon?: React.ElementType;
    className?: string;
}

export function MetricTile({
    label,
    title,
    value,
    unit = '',
    delta,
    deltaType = 'negative_good',
    delay = 0,
    icon: IconComponent,
    className
}: MetricTileProps) {

    const getDeltaBadge = () => {
        if (delta === undefined) return null;

        const isDeltaNumeric = typeof delta === 'number';
        const numericDelta = isDeltaNumeric ? delta : parseFloat(delta as string);

        // For Carbon, negative delta is good (Emerald). For trees planted, positive is good (Emerald).
        const isGood = deltaType === 'negative_good' ? numericDelta < 0 : numericDelta > 0;
        const isNeutral = numericDelta === 0 || deltaType === 'neutral';

        const colorClass = isNeutral
            ? 'text-zinc-400 bg-white/5 border-white/10'
            : isGood
                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                : 'text-amber-400 bg-amber-500/10 border-amber-500/20';

        const Icon = numericDelta > 0 ? TrendingUp : numericDelta < 0 ? TrendingDown : Minus;
        const displayDelta = isDeltaNumeric ? `${Math.abs(numericDelta)}%` : (delta as string).replace(/^-/, '').replace(/^\+/, '');

        return (
            <div className={cn("flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border", colorClass)}>
                <Icon className="w-3 h-3" />
                {displayDelta}
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay, type: "spring", bounce: 0.4 }}
            className="h-full"
        >
            <GlassCard className={cn("h-full flex flex-col justify-between p-5 sm:p-6", className)} glow="emerald">
                <div className="flex items-start justify-between mb-4">
                    <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        {IconComponent && <span className="text-emerald-500"><IconComponent className="w-4 h-4" /></span>}
                        {title || label}
                    </p>
                    {getDeltaBadge()}
                </div>

                <div className="flex items-baseline gap-2 mt-auto">
                    <span className="text-5xl font-display font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(80,200,120,0.2)]">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </span>
                    {unit && (
                        <span className="text-lg font-mono text-zinc-500 font-medium">{unit}</span>
                    )}
                </div>
            </GlassCard>
        </motion.div>
    );
}
