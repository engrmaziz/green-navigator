"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
    glow?: 'default' | 'emerald' | 'amber' | 'none';
    children: React.ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, glow = 'default', children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    'glass-card relative overflow-hidden group',
                    className
                )}
                whileHover={{
                    y: -2,
                    boxShadow: glow === 'default' || glow === 'none'
                        ? '0 0 40px rgba(255, 255, 255, 0.05)'
                        : glow === 'emerald'
                            ? '0 0 40px rgba(80, 200, 120, 0.15)'
                            : '0 0 40px rgba(255, 179, 71, 0.15)',
                }}
                transition={{ duration: 0.2 }}
                {...props}
            >
                {glow !== 'none' && (
                    <div
                        className={cn(
                            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen blur-3xl",
                            glow === 'emerald' ? 'bg-emerald-500/10' :
                                glow === 'amber' ? 'bg-amber-500/10' :
                                    'bg-white/5'
                        )}
                        aria-hidden="true"
                    />
                )}
                <div className="relative z-10 w-full h-full p-6">
                    {children}
                </div>
            </motion.div>
        );
    }
);
GlassCard.displayName = 'GlassCard';
