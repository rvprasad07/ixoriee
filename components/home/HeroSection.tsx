"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticWrapper } from "../common/MagneticWrapper";
import { ArrowDown, ArrowRight, ShieldCheck, Zap, Cpu, Sparkles } from "lucide-react";
import { InteractiveGlobe } from "../canvas/InteractiveGlobe";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth scroll-driven zoom effect inside the cards
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.3]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

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
      className="relative min-h-[110vh] sm:min-h-[120vh] lg:min-h-[125vh] flex flex-col justify-between items-center pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 w-full max-w-[1600px] mx-auto select-none overflow-hidden"
    >
      {/* ======================================================== */}
      {/* FIXED SIDE INDICATORS (ALWAYS VISIBLE & HIGH CONTRAST)    */}
      {/* ======================================================== */}
      {/* Left Edge: Rezo Zero Style Vertical "Scroll" Indicator */}
      <div className="hidden md:flex fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-50 pointer-events-none text-neutral-600 font-mono text-[10px] uppercase tracking-widest bg-white/80 backdrop-blur-md px-2 py-3.5 rounded-full border border-black/10 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1C1D20] animate-pulse" />
        <div className="w-px h-10 bg-black/20" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-neutral-600 font-semibold tracking-widest">
          Scroll
        </span>
      </div>

      {/* Right Edge: Rezo Zero Style Social Navigation Stack */}
      <div className="hidden md:flex fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3.5 z-50 font-mono text-xs text-neutral-600 bg-white/80 backdrop-blur-md px-2.5 py-4 rounded-full border border-black/10 shadow-sm pointer-events-auto">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1C1D20] hover:scale-110 font-semibold transition-all"
        >
          Tw
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1C1D20] hover:scale-110 font-semibold transition-all"
        >
          Lk
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1C1D20] hover:scale-110 font-semibold transition-all"
        >
          In
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1C1D20] hover:scale-110 font-semibold transition-all"
        >
          Git
        </a>
      </div>

      {/* ======================================================== */}
      {/* 2 SIDE IMAGE CARDS IN THE LOWER FLANKS (NO HEADING OVERLAP) */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full max-w-[1600px] mx-auto">
        {/* Card 01 (Left Flank Card): Architecture Wireframe */}
        <div
          className="absolute left-[1%] sm:left-[2%] md:left-[3%] lg:left-[4%] xl:left-[5%] bottom-[-2%] sm:bottom-[1%] md:bottom-[4%] lg:bottom-[6%] w-[220px] sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[390px] h-[310px] sm:h-[400px] md:h-[460px] lg:h-[510px] xl:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-[#E5E5E0] z-0 opacity-85 sm:opacity-95"
        >
          <div className="w-full h-full overflow-hidden relative">
            <motion.img
              style={{ scale: imageScale, y: imageY }}
              src="/images/architecture.jpg"
              alt="Architecture Wireframe"
              className="w-full h-full object-cover grayscale contrast-125 opacity-90 hover:opacity-100 hover:grayscale-0 transition-[opacity,filter] duration-700 will-change-transform"
              loading="eager"
            />
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            01 / ARCHITECTURE
          </div>
        </div>

        {/* Card 02 (Right Flank Card): Automation Infrastructure */}
        <div
          className="absolute right-[1%] sm:right-[2%] md:right-[3%] lg:right-[4%] xl:right-[5%] bottom-[-4%] sm:bottom-[-1%] md:bottom-[2%] lg:bottom-[4%] w-[220px] sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[390px] h-[310px] sm:h-[400px] md:h-[460px] lg:h-[510px] xl:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-[#141416] z-0 opacity-85 sm:opacity-95"
        >
          <div className="w-full h-full overflow-hidden relative">
            <motion.img
              style={{ scale: imageScale, y: imageY }}
              src="/images/automation.jpg"
              alt="Automation Infrastructure"
              className="w-full h-full object-cover grayscale contrast-125 opacity-90 hover:opacity-100 hover:grayscale-0 transition-[opacity,filter] duration-700 will-change-transform"
              loading="eager"
            />
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            02 / AUTOMATION
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CENTER: REZO ZERO INTERACTIVE 3D GLOBE / SPHERE           */}
      {/* ======================================================== */}
      <div className="absolute top-[28%] sm:top-[26%] left-1/2 -translate-x-1/2 z-0 opacity-40 pointer-events-none">
        <InteractiveGlobe />
      </div>

      {/* ======================================================== */}
      {/* TOP & CENTER CONTENT (CLEAN, PROMINENT & UNOBSTRUCTED)   */}
      {/* ======================================================== */}
      <div className="w-full flex flex-col items-center text-center relative z-20 pointer-events-auto">
        {/* Main Heading */}
        <div className="max-w-4xl lg:max-w-5xl text-left sm:text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
            className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem] font-medium tracking-[-0.038em] text-[#1C1D20] leading-[1.04]"
          >
            Ixoriee is a creative digital studio building impactful web systems &amp; automated infrastructure.
          </motion.h1>
        </div>

        {/* Sub-headline & Call-To-Actions */}
        <div className="max-w-2xl mt-8 sm:mt-10 px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="font-sans text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed"
          >
            We eliminate manual operational friction for ambitious startups and expanding brands through deep research, bespoke engineering, and autonomous workflow automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
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
      </div>

      {/* ======================================================== */}
      {/* BOTTOM TELEMETRY METRICS STRIP                           */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="mt-12 sm:mt-16 pt-8 border-t border-black/10 w-full max-w-3xl lg:max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left relative z-20 pointer-events-auto"
      >
        <div className="p-3.5 sm:p-4 bg-white/85 rounded-2xl border border-black/5 shadow-sm backdrop-blur-md">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            01 / PARADIGM
          </span>
          <span className="font-sans text-xs text-[#1C1D20] font-semibold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-neutral-600" />
            AI Speed + Human Taste
          </span>
        </div>

        <div className="p-3.5 sm:p-4 bg-white/85 rounded-2xl border border-black/5 shadow-sm backdrop-blur-md">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            02 / MOTION PHYSICS
          </span>
          <span className="font-sans text-xs text-[#1C1D20] font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-neutral-600" />
            60–120 FPS Locked
          </span>
        </div>

        <div className="p-3.5 sm:p-4 bg-white/85 rounded-2xl border border-black/5 shadow-sm backdrop-blur-md">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            03 / ARCHITECTURE
          </span>
          <span className="font-sans text-xs text-[#1C1D20] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
            Edge-Native &amp; Zero Lag
          </span>
        </div>

        <div className="p-3.5 sm:p-4 bg-white/85 rounded-2xl border border-black/5 shadow-sm backdrop-blur-md">
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
