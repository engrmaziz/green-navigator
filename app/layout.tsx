import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Green Navigator | Carbon Reporting, Finally Simple",
  description: "Turn utility bills into audit-ready emissions reports in minutes — not months.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body
        className="font-body antialiased"
        suppressHydrationWarning
      >
        {/* SVG Noise Filter as requested by atmosphere rules */}
        <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        {children}
        <Toaster theme="dark" position="top-center" />
      </body>
    </html>
  );
}