"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { GlassCard } from "./GlassCard";

interface DonutData {
    name: string;
    value: number;
    color: string;
}

interface DonutChartProps {
    data: DonutData[];
    height?: number;
    label?: string;
    totalLabel?: string; // added totalLabel prop
}

export function DonutChart({ data, height = 300, label, totalLabel = "Total" }: DonutChartProps) {
    return (
        <div className="w-full h-full flex flex-col relative" style={{ minHeight: height }}>
            {label && <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">{label}</h4>}

            <div className="flex-1 w-full relative" style={{ height: "100%", minHeight: height }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                            animationBegin={200}
                            animationDuration={1200}
                            animationEasing="ease-out"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0 0 10px ${entry.color}40)` }} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(18, 18, 18, 0.8)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ color: '#F0F0F0', fontFamily: 'var(--font-jetbrains)', fontWeight: 'bold' }}
                            formatter={(value: any) => {
                                const numValue = typeof value === 'number' ? value : 0;
                                return [`${numValue.toLocaleString()} kg CO₂e`, 'Emissions'];
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value) => <span className="text-zinc-300 text-sm font-medium ml-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Label Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{totalLabel}</span>
                    <span className="text-3xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        {data.reduce((acc, item) => acc + item.value, 0).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
