"use client";

import React from "react";
import { ResponsiveContainer, AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { GlassCard } from "./GlassCard";

interface DataPoint {
    [key: string]: string | number;
}

interface AreaChartProps {
    data: DataPoint[];
    xAxisKey?: string;
    seriesKey?: string;
    height?: number;
    label?: string;
    delay?: number;
    color?: string; // added color prop
}

export function AreaChart({
    data,
    xAxisKey = "name",
    seriesKey = "value",
    height = 300,
    label,
    color = "var(--emerald)"
}: AreaChartProps) {
    return (
        <div className="w-full h-full flex flex-col relative" style={{ minHeight: height }}>
            {label && <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-6">{label}</h4>}

            <div className="flex-1 w-full relative" style={{ height: "100%", minHeight: height }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorEmerald" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#50C878" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#50C878" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey={xAxisKey}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(240,240,240,0.4)', fontSize: 12, fontFamily: 'var(--font-jetbrains)' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(240,240,240,0.4)', fontSize: 12, fontFamily: 'var(--font-jetbrains)' }}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(18, 18, 18, 0.8)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ color: '#F0F0F0', fontFamily: 'var(--font-jetbrains)' }}
                            labelStyle={{ color: 'rgba(240, 240, 240, 0.65)', marginBottom: '4px' }}
                            cursor={{ stroke: 'rgba(80, 200, 120, 0.4)', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey={seriesKey}
                            stroke="#50C878"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorEmerald)"
                            animationDuration={1500}
                            animationEasing="ease-out"
                        />
                    </RechartsAreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
