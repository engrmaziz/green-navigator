"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, CloudLightning, FileText, Lock, Network, Play, Shield, Users } from "lucide-react";
import Link from "next/link";
import { MarketingNav } from "@/components/ds/MarketingNav";
import { MarketingFooter } from "@/components/ds/MarketingFooter";
import { GlowButton } from "@/components/ds/GlowButton";
import { GlassCard } from "@/components/ds/GlassCard";
import dynamic from "next/dynamic";
const DashboardPreview = dynamic(() => import("./app/dashboard/page"), { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center text-emerald-500 font-mono text-sm">Loading Preview...</div> });

export default function Home() {
  const stagger = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1, duration: 0.4 } }
  };

  return (
    <div className="min-h-screen flex flex-col pt-20 overflow-hidden relative selection:bg-emerald-500/20 selection:text-white">
      <MarketingNav />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-16 pb-32 px-6 bg-[linear-gradient(135deg,#0A0A0A_0%,#0d1f14_50%,#0A0A0A_100%)]">

        {/* Particle Field (Simplified CSS version) */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl z-10 flex flex-col items-center text-center space-y-8"
        >
          <h1 className="text-6xl md:text-[clamp(64px,8vw,96px)] font-display font-extrabold tracking-tighter text-white leading-[1.05]">
            Carbon Reporting,<br />
            <span className="text-emerald-500 text-glow">Finally Simple.</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 font-sans font-light max-w-2xl text-balance">
            Green Navigator turns utility bills into audit-ready emissions reports in minutes — not months.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link href="/signup">
              <GlowButton size="lg" className="w-full sm:w-auto">Start Free — No Card Needed</GlowButton>
            </Link>
            <GlowButton variant="ghost" size="lg" className="w-full sm:w-auto gap-2">
              <Play className="w-5 h-5" /> Watch 2-min Demo
            </GlowButton>
          </div>

          {/* Social Proof Strip */}
          <div className="pt-16 flex flex-col items-center gap-6 opacity-60">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Trusted by 1,200+ SMBs</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center grayscale">
              {/* Dummy logos using text for now */}
              <span className="font-display font-bold text-xl text-white">LUMIERE</span>
              <span className="font-display font-bold text-xl text-white">Axiom</span>
              <span className="font-display font-bold text-xl text-white opacity-80">NEXUS.</span>
              <span className="font-display font-bold text-xl text-white italic">Vertex</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- DASHBOARD PREVIEW --- */}
      <section className="relative w-full max-w-7xl mx-auto px-6 -mt-32 z-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-[0_0_100px_rgba(80,200,120,0.15)] overflow-hidden scale-90 md:scale-100"
          style={{ perspective: "1000px" }}
        >
          {/* Note: We embed a static dummy image or functional Dashboard view here. Using functional for demo. */}
          <div className="w-full h-[600px] overflow-hidden pointer-events-none relative select-none">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
            <DashboardPreview />
          </div>
        </motion.div>
      </section>

      {/* --- METRICS BAR --- */}
      <section className="w-full border-y border-white/5 bg-white/[0.02] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {[
            { value: "1.2M+", label: "kg CO₂e Tracked" },
            { value: "94%", label: "Report Accuracy" },
            { value: "< 3m", label: "Upload to Report" }
          ].map((metric, i) => (
            <div key={i} className="flex flex-col items-center justify-center w-full pt-8 md:pt-0 first:pt-0">
              <span className="font-display font-bold text-5xl text-emerald-400 mb-2">{metric.value}</span>
              <span className="font-sans font-medium text-zinc-400 uppercase tracking-widest text-sm">{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES BENTO --- */}
      <section className="py-32 w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Everything an SMB needs to stay compliant.</h2>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="col-span-1 md:col-span-2 glass-card-hover" glow="emerald">
            <CloudLightning className="w-8 h-8 text-emerald-400 mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-2">AI Document Parsing</h3>
            <p className="text-zinc-400 leading-relaxed max-w-md">Drop any utility bill—PDF, JPG, or raw text. Our engine instantly extracts the specific data needed to calculate localized equivalents in milliseconds.</p>
          </GlassCard>

          <GlassCard className="glass-card-hover">
            <Network className="w-8 h-8 text-white mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-2">Scope 1–3 Tracking</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">Categorize emissions seamlessly across direct operations and supply chain loops.</p>
          </GlassCard>

          <GlassCard className="glass-card-hover">
            <FileText className="w-8 h-8 text-white mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-2">One-Click GHG Reports</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">Export instantly to ISO 14064 or standard GHG protocol PDFs.</p>
          </GlassCard>

          <GlassCard className="glass-card-hover">
            <Users className="w-8 h-8 text-white mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-2">Team Permissions</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">Role-based matrices to ensure data stays protected.</p>
          </GlassCard>

          <GlassCard className="glass-card-hover" glow="emerald">
            <Shield className="w-8 h-8 text-white mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-2">Immutable Audit Trail</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">Every API call, calculation, and document upload is hash-logged for future compliance auditing.</p>
          </GlassCard>
        </motion.div>
      </section>

      {/* --- HOW IT WORKS / STEPS --- */}
      <section className="py-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Dashed Line Background (hidden on mobile) */}
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-emerald-500/30 z-0" />

            {[
              { title: "Upload Bills", desc: "Drag & drop historical utility data into the engine." },
              { title: "AI Extracts Data", desc: "We parse the exact units and apply the localized Grid Mix modifiers." },
              { title: "Download Report", desc: "Walk away with an audit-ready compliance PDF in minutes." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center font-display font-bold text-2xl text-black shadow-[0_0_30px_rgba(80,200,120,0.5)] mb-6 transition-transform group-hover:scale-110">
                  {i + 1}
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-sm max-w-[250px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 w-full relative overflow-hidden flex flex-col items-center text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(80,200,120,0.08),transparent_60%)]" />

        <h2 className="text-5xl md:text-7xl font-display font-extrabold text-white tracking-tighter mb-8 z-10">
          Start reporting in <span className="text-emerald-500">10 minutes.</span>
        </h2>

        <div className="z-10 flex flex-col items-center gap-4">
          <Link href="/signup">
            <GlowButton size="lg" className="w-[300px]">Create Free Account</GlowButton>
          </Link>
          <p className="text-sm font-sans text-zinc-500">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
