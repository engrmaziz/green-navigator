"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm as useHookForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Building2, MapPin, ArrowRight, Loader2, Factory, Link as LinkIcon, AlertCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { GlassCard } from "@/components/ds/GlassCard";
import { GlowButton } from "@/components/ds/GlowButton";

const formSchema = z.object({
    companyName: z.string().min(2, "Company name must be at least 2 characters."),
    industry: z.string().min(2, "Industry is required."),
    location: z.enum(["US", "PK", "GB", "EU", "AU"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useHookForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            industry: "",
            location: "US", // Default string match enum
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            // Simulate API call and save to local storage
            await new Promise((resolve) => setTimeout(resolve, 800));
            localStorage.setItem("green_navigator_profile", JSON.stringify(data));

            toast.success("Profile created successfully", {
                description: "Welcome to Green Navigator.",
            });
            router.push("/app/dashboard");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        const fieldsToValidate = step === 1
            ? ["companyName"] as const
            : ["industry", "location"] as const;

        form.trigger(fieldsToValidate).then((isValid) => {
            if (isValid) setStep((s) => s + 1);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground relative overflow-hidden selection:bg-emerald-500/20 selection:text-white">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-lg relative z-10"
            >
                {/* Header Sequence */}
                <div className="flex flex-col items-center justify-center mb-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(80,200,120,0.3)]">
                        <Leaf className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                        Welcome to <span className="text-emerald-500 text-glow">Green Navigator</span>
                    </h1>
                    <p className="text-zinc-400 mt-2 font-sans">Let's set up your compliance workspace.</p>
                </div>

                <GlassCard className="p-8 md:p-10 border-white/10" glow="emerald">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                        <h2 className="text-xl font-display font-bold text-white">Configure Profile</h2>
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded">
                            Step {step} of 2
                        </span>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="relative min-h-[160px]">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0"
                                    >
                                        <div className="flex flex-col gap-2 group">
                                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                                                Company Name
                                            </label>
                                            <div className="relative flex items-center">
                                                <Building2 className="absolute left-4 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                                                <input
                                                    placeholder="Acme Corporation"
                                                    className="w-full pl-12 pr-4 h-14 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                                                    {...form.register("companyName")}
                                                />
                                            </div>
                                            {form.formState.errors.companyName && (
                                                <span className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" /> {form.formState.errors.companyName.message}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 flex flex-col gap-5"
                                    >
                                        <div className="flex flex-col gap-2 group">
                                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                                                Industry
                                            </label>
                                            <div className="relative flex items-center">
                                                <Factory className="absolute left-4 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                                                <input
                                                    placeholder="Technology"
                                                    className="w-full pl-12 pr-4 h-14 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
                                                    {...form.register("industry")}
                                                />
                                            </div>
                                            {form.formState.errors.industry && (
                                                <span className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" /> {form.formState.errors.industry.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2 group">
                                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                                                Operating Region
                                            </label>
                                            <div className="relative flex items-center">
                                                <MapPin className="absolute left-4 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors pointer-events-none" />
                                                <select
                                                    className="w-full pl-12 pr-10 h-14 bg-white/[0.04] border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans appearance-none cursor-pointer"
                                                    {...form.register("location")}
                                                >
                                                    <option className="bg-[#0A0A0A] text-white" value="US">United States (US)</option>
                                                    <option className="bg-[#0A0A0A] text-white" value="PK">Pakistan (PK)</option>
                                                    <option className="bg-[#0A0A0A] text-white" value="GB">United Kingdom (GB)</option>
                                                    <option className="bg-[#0A0A0A] text-white" value="EU">European Union (EU)</option>
                                                    <option className="bg-[#0A0A0A] text-white" value="AU">Australia (AU)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="pt-6 flex gap-3">
                            {step > 1 && (
                                <GlowButton
                                    type="button"
                                    variant="ghost"
                                    className="basis-1/3 border-white/10"
                                    onClick={() => setStep(step - 1)}
                                >
                                    Back
                                </GlowButton>
                            )}

                            {step === 1 ? (
                                <GlowButton
                                    type="button"
                                    className="flex-1"
                                    onClick={nextStep}
                                >
                                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                                </GlowButton>
                            ) : (
                                <GlowButton
                                    type="submit"
                                    className="flex-1"
                                    isLoading={isSubmitting}
                                >
                                    Complete Setup <ArrowRight className="w-4 h-4 ml-2" />
                                </GlowButton>
                            )}
                        </div>
                    </form>
                </GlassCard>

                <div className="mt-8 text-center flex items-center justify-center gap-2 text-sm text-zinc-500">
                    <LinkIcon className="w-4 h-4" /> Seamless integration with Quickbooks & Xero available inside.
                </div>
            </motion.div>
        </div>
    );
}
