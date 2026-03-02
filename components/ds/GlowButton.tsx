"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface GlowButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

export const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {

        // Base styles
        const baseStyles = "relative inline-flex items-center justify-center font-sans tracking-wide transition-all overflow-hidden disabled:opacity-50 disabled:pointer-events-none";

        // Variant styles
        const variants = {
            primary: "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white border border-emerald-400/30 font-semibold shadow-[0_0_20px_rgba(80,200,120,0.2)] hover:shadow-[0_0_40px_rgba(80,200,120,0.4)]",
            ghost: "bg-transparent text-zinc-300 border border-transparent hover:border-white/10 hover:bg-white/5 font-medium",
            danger: "bg-gradient-to-br from-red-500/80 to-red-700/80 text-white border border-red-500/30 shadow-[0_0_20px_rgba(255,82,82,0.15)] hover:shadow-[0_0_40px_rgba(255,82,82,0.3)]",
        };

        // Size styles
        const sizes = {
            sm: "h-9 px-4 text-sm rounded-xl",
            md: "h-12 px-6 text-base rounded-2xl",
            lg: "h-14 px-8 text-lg rounded-2xl",
            icon: "h-12 w-12 rounded-2xl",
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.97 }}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {variant === 'primary' && (
                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out pointer-events-none mix-blend-overlay" />
                )}

                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="relative z-10 flex items-center justify-center">
                    {children as React.ReactNode}
                </span>
            </motion.button>
        );
    }
);
GlowButton.displayName = 'GlowButton';
