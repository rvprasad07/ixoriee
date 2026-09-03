"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { MagneticWrapper } from "../common/MagneticWrapper";
import { TextMaskReveal } from "../common/TextMaskReveal";
import { ArrowDown, ArrowRight, ShieldCheck, Zap, Cpu, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToProof = () => {
    const el = document.getElementById("transformation-slider");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] sm:min-h-[95vh] flex flex-col justify-start items-center pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto select-none overflow-hidden"
    >
      {/* ======================================================== */}
      {/* MINIMALIST FLOATING SIDE INDICATORS (REZO ZERO STYLE)    */}
      {/* ======================================================== */}
      {/* Left Edge: Vertical "Scroll" Indicator */}
      <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-30 pointer-events-none text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1C1D20]" />
        <div className="w-px h-12 bg-black/15" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-neutral-500">
          Scroll
        </span>
      </div>

      {/* Right Edge: Social Navigation Stack */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-30 font-mono text-xs text-neutral-500 pointer-events-auto">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1C1D20] hover:scale-110 transition-all"
        >
          Tw
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1C1D20] hover:scale-110 transition-all"
        >
          Lk
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1C1D20] hover:scale-110 transition-all"
        >
          In
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1C1D20] hover:scale-110 transition-all"
        >
          Git
        </a>
      </div>

      {/* ======================================================== */}
      {/* FOREGROUND: SWISS EDITORIAL TYPOGRAPHY & OVERLINE PILL    */}
      {/* ======================================================== */}
      <div className="max-w-5xl text-center px-2 relative z-20 pointer-events-auto flex flex-col items-center">
        {/* Overline Badge */}
        <TextMaskReveal>
          <div className="inline-flex items-center gap-2 font-mono text-xs text-neutral-600 bg-neutral-200/60 px-4 py-1.5 rounded-full mb-8 border border-black/5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>[ INTELLIGENCE-AUGMENTED DIGITAL STUDIO • AI + HI ]</span>
          </div>
        </TextMaskReveal>

        {/* Main Headline */}
        <TextMaskReveal delay={0.1}>
          <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-medium tracking-tight text-[#1C1D20] leading-[1.04]">
            Ixoriee is a creative digital studio building impactful web systems &amp; automated infrastructure.
          </h1>
        </TextMaskReveal>
      </div>

      {/* Sub-headline & Call-To-Actions Group */}
      <div className="max-w-2xl mt-8 sm:mt-10 text-center relative z-20 pointer-events-auto px-2">
        <TextMaskReveal delay={0.2}>
          <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed">
            We eliminate manual operational friction for ambitious startups and expanding brands through deep research, bespoke engineering, and autonomous workflow automation.
          </p>
        </TextMaskReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <MagneticWrapper onClick={scrollToProof}>
            <button className="flex items-center gap-2 bg-[#1C1D20] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-black transition-colors shadow-sm cursor-pointer">
              <span>Explore Systems &amp; Proof</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </MagneticWrapper>

          <button
            onClick={scrollToServices}
            className="group inline-flex items-center gap-2 font-mono text-xs text-neutral-600 hover:text-black transition-colors py-2 px-4 rounded-full hover:bg-black/5 cursor-pointer"
          >
            <span>Discover The 4 Pillars</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Telemetry Metrics Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.33, 1, 0.68, 1] }}
        className="mt-16 sm:mt-24 pt-8 border-t border-black/10 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 text-left relative z-20 pointer-events-auto"
      >
        <div className="p-4 bg-white/80 rounded-2xl border border-black/5 shadow-sm">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            01 / PARADIGM
          </span>
          <span className="font-sans text-xs text-[#1C1D20] font-semibold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-neutral-600" />
            AI Speed + Human Taste
          </span>
        </div>

        <div className="p-4 bg-white/80 rounded-2xl border border-black/5 shadow-sm">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            02 / MOTION PHYSICS
          </span>
          <span className="font-sans text-xs text-[#1C1D20] font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-neutral-600" />
            60–120 FPS Locked
          </span>
        </div>

        <div className="p-4 bg-white/80 rounded-2xl border border-black/5 shadow-sm">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            03 / ARCHITECTURE
          </span>
          <span className="font-sans text-xs text-[#1C1D20] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
            Edge-Native &amp; Zero Lag
          </span>
        </div>

        <div className="p-4 bg-white/80 rounded-2xl border border-black/5 shadow-sm">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            04 / DISPATCH
          </span>
          <span className="font-sans text-xs text-[#1C1D20] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            India Studio • Global Reach
          </span>
        </div>
      </motion.div>
    </section>
  );
};
