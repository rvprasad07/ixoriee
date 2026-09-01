import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/common/CustomCursor";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "IXORIEE — Intelligence-Augmented Digital Studio (AI + HI)",
  description:
    "Architecting intelligent web systems & automated infrastructure for modern business. Dennis Snellenberg kinetic physics + Rezo Zero Swiss grid discipline. Warm editorial luxury design standard.",
  keywords: [
    "Ixoriee",
    "Digital Studio",
    "AI + HI",
    "Full-Stack SaaS",
    "Agentic Automations",
    "Next.js App Router",
    "India Studio",
  ],
  authors: [{ name: "IXORIEE Architecture Studio" }],
  openGraph: {
    title: "IXORIEE — Intelligence-Augmented Digital Studio",
    description:
      "Eliminating manual operational friction through deep research, bespoke engineering, and autonomous workflow automation.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F4F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body className="bg-[#F4F4F0] text-[#1C1D20] antialiased selection:bg-[#1C1D20] selection:text-white min-h-screen relative overflow-x-hidden transition-colors duration-500">
        {/* Global Context-Aware Lerp Cursor */}
        <CustomCursor />

        {/* Children Pages */}
        {children}
      </body>
    </html>
  );
}
