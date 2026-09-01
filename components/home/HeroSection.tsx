"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticWrapper } from "../common/MagneticWrapper";
import { LocatedInIndiaBadge } from "../common/LocatedInIndiaBadge";
import { ArrowDown, ArrowRight, ShieldCheck, Zap, Cpu, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax translation: cards scroll UP as the user scrolls down, passing behind the main heading
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -340]);
  const yCenter = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -380]);

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
      className="relative min-h-[105vh] sm:min-h-[115vh] flex flex-col justify-start items-center pt-32 sm:pt-40 pb-20 px-4 sm:px-6 max-w-7xl mx-auto select-none overflow-hidden"
    >
      {/* Dennis Snellenberg Floating "Located in India" Globe Widget - Scoped to Hero Only */}
      <LocatedInIndiaBadge />

      {/* Left Edge: Rezo Zero Style Vertical "Scroll" Indicator */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-30 pointer-events-none text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1C1D20]" />
        <div className="w-px h-12 bg-black/15" />
        <span className="[writing-mode:vertical-lr] rotate-180 text-neutral-500">
          Scroll
        </span>
      </div>

      {/* Right Edge: Rezo Zero Style Social Navigation Stack */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-30 font-mono text-xs text-neutral-500">
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
      {/* 3 PARALLAX IMAGE CARDS BEHIND THE MAIN HEADING           */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden max-w-7xl mx-auto">
        {/* Card 01 (Left Image Card): Monochrome Architecture Curve */}
        <motion.div
          style={{ y: yLeft }}
          className="absolute left-[2%] sm:left-[5%] bottom-[-12%] sm:bottom-[-6%] w-[240px] sm:w-[320px] md:w-[380px] h-[340px] sm:h-[450px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-[#E5E5E0] z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop"
            alt="Architectural Geometry"
            className="w-full h-full object-cover grayscale contrast-125 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
            loading="eager"
          />
          <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
            01 / ARCHITECTURE
          </div>
        </motion.div>

        {/* Card 02 (Center Image Card): Geometric Structure & Optical Art */}
        <motion.div
          style={{ y: yCenter }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[-24%] sm:bottom-[-16%] w-[210px] sm:w-[270px] md:w-[320px] h-[300px] sm:h-[390px] md:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-black/10 bg-[#FFFFFF] z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?q=80&w=1000&auto=format&fit=crop"
            alt="Parametric Geometric Structure"
            className="w-full h-full object-cover grayscale contrast-125 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
            loading="eager"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-[#1C1D20] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-black/5">
            02 / KINETIC SYSTEMS
          </div>
        </motion.div>

        {/* Card 03 (Right Image Card): High-Contrast Editorial Dynamic Motion */}
        <motion.div
          style={{ y: yRight }}
          className="absolute right-[2%] sm:right-[5%] bottom-[-14%] sm:bottom-[-8%] w-[250px] sm:w-[330px] md:w-[390px] h-[350px] sm:h-[460px] md:h-[510px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-[#141416] z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
            alt="Digital Architecture"
            className="w-full h-full object-cover grayscale contrast-125 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
            loading="eager"
          />
          <div className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
            03 / AUTOMATION
          </div>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* FOREGROUND: REZO ZERO SHORTENED 3-LINE TYPOGRAPHY LAYER   */}
      {/* ======================================================== */}
      <div className="max-w-5xl text-left sm:text-center px-2 relative z-20 pointer-events-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
          className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-medium tracking-[-0.038em] text-[#1C1D20] leading-[1.04]"
        >
          Ixoriee is a creative digital studio building impactful web systems &amp; automated infrastructure.
        </motion.h1>
      </div>

      {/* Sub-headline & Call-To-Actions Group */}
      <div className="max-w-2xl mt-8 sm:mt-10 text-center relative z-20 pointer-events-auto">
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
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <MagneticWrapper onClick={scrollToProof}>
            <button className="flex items-center gap-2 bg-[#1C1D20] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-black transition-colors shadow-sm">
              <span>Explore Systems &amp; Proof</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </MagneticWrapper>

          <button
            onClick={scrollToServices}
            className="group inline-flex items-center gap-2 font-mono text-xs text-neutral-600 hover:text-black transition-colors py-2 px-4 rounded-full hover:bg-black/5"
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
        className="mt-24 sm:mt-32 pt-8 border-t border-black/10 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 text-left relative z-20 pointer-events-auto"
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
