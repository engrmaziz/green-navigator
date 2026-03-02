"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
    UploadCloud, FileText, CheckCircle2, AlertCircle, X,
    MoreHorizontal, Search, Download, Trash2, Maximize2, Sparkles
} from "lucide-react";
import { GlassCard } from "@/components/ds/GlassCard";
import { GlowButton } from "@/components/ds/GlowButton";
import { cn } from "@/lib/utils";

// Dummy Document Data
const documents = [
    { id: "DOC-2024-001", name: "SNGPL_Jan_2024.pdf", type: "Natural Gas Bill", date: "2024-03-12", size: "1.2 MB", status: "Processed", value: "450 MMBTU" },
    { id: "DOC-2024-002", name: "LESCO_Feb_2024.pdf", type: "Electricity Bill", date: "2024-03-10", size: "2.4 MB", status: "Processed", value: "12,400 kWh" },
    { id: "DOC-2024-003", name: "Fuel_Logs_Q1.xlsx", type: "Fleet Fuel Data", date: "2024-03-08", size: "0.8 MB", status: "Pending Review", value: "N/A" },
    { id: "DOC-2024-004", name: "Flight_Manifest.csv", type: "Business Travel", date: "2024-03-01", size: "0.5 MB", status: "Processed", value: "34,000 miles" },
    { id: "DOC-2024-005", name: "KE_Dec_2023.pdf", type: "Electricity Bill", date: "2024-01-15", size: "1.8 MB", status: "Error", value: "Failed" },
];

export default function DocumentsPage() {
    const [selectedDoc, setSelectedDoc] = useState<typeof documents[0] | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Mock upload handler
    const handleUpload = () => {
        setIsUploading(true);
        setTimeout(() => setIsUploading(false), 2000); // Simulate processing
    };

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-700">

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-1">
                        Document Intelligence
                    </h1>
                    <p className="text-zinc-400 font-sans">
                        AI-powered extraction of utility bills and Excel datasheets.
                    </p>
                </div>
                <div className="flex gap-3">
                    <GlowButton variant="primary" size="sm" onClick={() => document.getElementById('fileUpload')?.click()}>
                        <UploadCloud className="w-4 h-4 mr-2" /> Upload Files
                        <input type="file" id="fileUpload" className="hidden" multiple onChange={handleUpload} />
                    </GlowButton>
                </div>
            </header>

            {/* Split Screen Container */}
            <div className="flex flex-1 gap-6 overflow-hidden">

                {/* Left Side: Document List */}
                <GlassCard className="flex-1 flex flex-col overflow-hidden">

                    {/* List Header/Toolbar */}
                    <div className="p-4 border-b border-white/5 flex gap-4 bg-white/[0.01] shrink-0">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search documents by name or ID..."
                                className="w-full h-9 bg-white/5 border border-transparent focus:border-emerald-500/30 rounded-lg pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all font-sans"
                            />
                        </div>
                        <GlowButton variant="ghost" className="border-white/10" size="sm">
                            Filter Status
                        </GlowButton>
                    </div>

                    {/* Progress Bar for Mock Upload */}
                    {isUploading && (
                        <div className="h-1 w-full bg-white/5 shrink-0 overflow-hidden relative">
                            <motion.div
                                className="absolute top-0 bottom-0 left-0 bg-emerald-500"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </div>
                    )}

                    {/* List View */}
                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="space-y-1">
                            {documents.map((doc) => (
                                <button
                                    key={doc.id}
                                    onClick={() => setSelectedDoc(doc)}
                                    className={cn(
                                        "w-full flex flex-col p-3 rounded-xl transition-all text-left group border border-transparent",
                                        selectedDoc?.id === doc.id
                                            ? "bg-emerald-500/10 border-emerald-500/20"
                                            : "hover:bg-white/[0.04] hover:border-white/10"
                                    )}
                                >
                                    <div className="flex items-start justify-between w-full mb-1">
                                        <div className="flex items-center gap-2">
                                            <FileText className={cn("w-4 h-4", selectedDoc?.id === doc.id ? "text-emerald-400" : "text-zinc-400")} />
                                            <span className="text-sm font-semibold text-white truncate max-w-[200px]">{doc.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-zinc-500 font-mono-data">{doc.size}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full pl-6">
                                        <span className="text-xs text-zinc-400 bg-white/5 px-2 py-0.5 rounded">{doc.type}</span>

                                        <div className="flex items-center gap-1.5">
                                            {doc.status === 'Processed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                                            {doc.status === 'Pending Review' && <AlertCircle className="w-3.5 h-3.5 text-amber-500" />}
                                            {doc.status === 'Error' && <X className="w-3.5 h-3.5 text-red-500" />}
                                            <span className={cn("text-[10px] font-bold uppercase tracking-widest",
                                                doc.status === 'Processed' ? 'text-emerald-500' :
                                                    doc.status === 'Pending Review' ? 'text-amber-500' : 'text-red-500'
                                            )}>
                                                {doc.status}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </GlassCard>

                {/* Right Side: Document Preview & AI Extraction Data */}
                <AnimatePresence mode="wait">
                    {selectedDoc ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-[450px] shrink-0 flex flex-col gap-4"
                        >
                            {/* Preview Window */}
                            <GlassCard className="h-1/2 flex flex-col overflow-hidden relative group">
                                <div className="p-3 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
                                    <span className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
                                        <FileText className="w-3.5 h-3.5" /> Source Preview
                                    </span>
                                    <button className="text-zinc-500 hover:text-white transition-colors">
                                        <Maximize2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Fake PDF Preview Area */}
                                <div className="flex-1 bg-zinc-950 p-4 overflow-y-auto">
                                    <div className="aspect-[1/1.414] w-full bg-white shadow-lg mx-auto p-6 relative">
                                        {/* Skeleton Content mimicking a bill */}
                                        <div className="h-6 w-1/3 bg-zinc-200 mb-8 rounded" />
                                        <div className="space-y-3 mb-8">
                                            <div className="h-2 w-1/2 bg-zinc-100 rounded" />
                                            <div className="h-2 w-2/3 bg-zinc-100 rounded" />
                                        </div>
                                        {/* Highlight Box representing AI extraction */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="absolute top-1/3 left-6 right-6 h-12 border-2 border-emerald-500 bg-emerald-500/10 rounded flex items-center justify-end px-4"
                                        >
                                            <span className="absolute -top-6 right-0 bg-emerald-500 text-black text-[9px] font-bold px-2 py-0.5 rounded shadow">Extracted Value</span>
                                        </motion.div>
                                    </div>
                                </div>
                            </GlassCard>

                            {/* Extraction Data Panel */}
                            <GlassCard className="flex-1 flex flex-col overflow-hidden p-0 border-emerald-500/20 shadow-[0_0_30px_rgba(80,200,120,0.05)]">
                                <div className="p-4 border-b border-white/5 bg-emerald-500/5 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-emerald-500" />
                                    <h3 className="text-sm font-semibold text-white">Gemini Extract Output</h3>
                                </div>
                                <div className="p-5 flex-1 overflow-y-auto space-y-6">

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Extracted Quantity</span>
                                            <span className="text-lg font-mono-data font-bold text-white">{selectedDoc.value}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Confidence Score</span>
                                            <span className="text-sm font-bold text-emerald-500">98.5%</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Bill Period</span>
                                            <span className="text-sm font-sans text-white">{format(new Date(selectedDoc.date), "MMMM yyyy")}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-4 flex gap-3">
                                        <GlowButton variant="primary" className="flex-1">Verify Record</GlowButton>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-[450px] shrink-0 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Search className="w-6 h-6 text-zinc-500" />
                            </div>
                            <h3 className="text-lg font-display font-medium text-white mb-2">Select a document</h3>
                            <p className="text-sm text-zinc-500 font-sans">
                                Click on any document in the list to view its source file and AI extraction details here.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
