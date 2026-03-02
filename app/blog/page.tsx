import Link from "next/link";
import { MarketingNav } from "@/components/ds/MarketingNav";
import { MarketingFooter } from "@/components/ds/MarketingFooter";
import { GlowButton } from "@/components/ds/GlowButton";

export default function BlogPage() {
    return (
        <div className="min-h-screen flex flex-col pt-20 bg-background text-foreground">
            <MarketingNav />

            <main className="flex-1 flex flex-col items-center justify-center py-32 px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Coming Soon
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-white mb-6">
                    Insights & Updates
                </h1>
                <p className="text-zinc-400 max-w-lg mb-8 text-lg">
                    We're spinning up our engineering and sustainability blog. Check back soon for deep dives into carbon accounting, API architecture, and ESG compliance.
                </p>
                <div className="flex gap-4">
                    <Link href="/">
                        <GlowButton>Return Home</GlowButton>
                    </Link>
                </div>
            </main>

            <MarketingFooter />
        </div>
    );
}
