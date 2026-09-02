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

  // Card containers remain anchored at the sides.
  // The image inside the cards scales/zooms smoothly on scroll.
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.35]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

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
      className="relative min-h-[105vh] sm:min-h-[115vh] flex flex-col justify-start items-center pt-32 sm:pt-40 pb-20 px-4 sm:px-6 w-full max-w-[1600px] mx-auto select-none overflow-hidden"
    >
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
      {/* 2 SIDE IMAGE CARDS (ANCHORED AT LEFT & RIGHT SIDES)       */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full max-w-[1600px] mx-auto">
        {/* Card 01 (Left Side Card): Architecture Wireframe */}
        <div
          className="absolute -left-12 sm:left-2 md:left-4 lg:left-6 xl:left-8 top-32 sm:top-36 md:top-40 lg:top-36 w-[190px] sm:w-[250px] md:w-[290px] lg:w-[330px] xl:w-[370px] h-[280px] sm:h-[370px] md:h-[440px] lg:h-[500px] xl:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-[#E5E5E0] z-0 opacity-80 sm:opacity-95"
        >
          <div className="w-full h-full overflow-hidden relative">
            <motion.img
              style={{ scale: imageScale, y: imageY }}
              src="/images/architecture.jpg"
              alt="Architecture System Design"
              className="w-full h-full object-cover grayscale contrast-125 opacity-90 hover:opacity-100 hover:grayscale-0 transition-[opacity,filter] duration-700 will-change-transform"
              loading="eager"
            />
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            01 / ARCHITECTURE
          </div>
        </div>

        {/* Card 02 (Right Side Card): Automated Infrastructure */}
        <div
          className="absolute -right-12 sm:right-2 md:right-4 lg:right-6 xl:right-8 top-32 sm:top-36 md:top-40 lg:top-36 w-[190px] sm:w-[250px] md:w-[290px] lg:w-[330px] xl:w-[370px] h-[280px] sm:h-[370px] md:h-[440px] lg:h-[500px] xl:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-[#141416] z-0 opacity-80 sm:opacity-95"
        >
          <div className="w-full h-full overflow-hidden relative">
            <motion.img
              style={{ scale: imageScale, y: imageY }}
              src="/images/automation.jpg"
              alt="Automation Workflow Infrastructure"
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
      <div className="absolute top-28 sm:top-24 left-1/2 -translate-x-1/2 z-0 opacity-35 sm:opacity-45 pointer-events-none">
        <InteractiveGlobe />
      </div>

      {/* ======================================================== */}
      {/* FOREGROUND: REZO ZERO SHORTENED 3-LINE TYPOGRAPHY LAYER   */}
      {/* ======================================================== */}
      <div className="max-w-4xl lg:max-w-5xl text-left sm:text-center px-4 relative z-20 pointer-events-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
          className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem] font-medium tracking-[-0.038em] text-[#1C1D20] leading-[1.04]"
        >
          Ixoriee is a creative digital studio building impactful web systems &amp; automated infrastructure.
        </motion.h1>
      </div>

      {/* Sub-headline & Call-To-Actions Group */}
      <div className="max-w-2xl mt-8 sm:mt-10 text-center relative z-20 pointer-events-auto px-4">
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
        className="mt-20 sm:mt-28 pt-8 border-t border-black/10 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 text-left relative z-20 pointer-events-auto"
      >
        <div className="p-4 bg-white/80 rounded-2xl border border-black/5 shadow-sm backdrop-blur-sm">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            01 / PARADIGM
          </span>
          <span className="font-sans text-xs text-[#1C1D20] font-semibold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-neutral-600" />
            AI Speed + Human Taste
          </span>
        </div>

        <div className="p-4 bg-white/80 rounded-2xl border border-black/5 shadow-sm backdrop-blur-sm">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            02 / MOTION PHYSICS
          </span>
          <span className="font-sans text-xs text-[#1C1D20] font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-neutral-600" />
            60–120 FPS Locked
          </span>
        </div>

        <div className="p-4 bg-white/80 rounded-2xl border border-black/5 shadow-sm backdrop-blur-sm">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
            03 / ARCHITECTURE
          </span>
          <span className="font-sans text-xs text-[#1C1D20] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
            Edge-Native &amp; Zero Lag
          </span>
        </div>

        <div className="p-4 bg-white/80 rounded-2xl border border-black/5 shadow-sm backdrop-blur-sm">
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
