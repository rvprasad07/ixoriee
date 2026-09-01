"use client";

import React, { useState, useRef, useCallback } from "react";
import { TextMaskReveal } from "../common/TextMaskReveal";

export const TransformationSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPos(percentage);
  }, []);

  const onPointerDown = () => setIsDragging(true);
  const onPointerUp = () => setIsDragging(false);

  return (
    <section id="transformation-slider" className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-20 z-10 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-black/10 pb-8 gap-6">
        <div>
          <TextMaskReveal>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C1D20]" />
              <span>[ PROOF OF TRANSFORMATION ]</span>
            </div>
          </TextMaskReveal>
          <TextMaskReveal delay={0.1}>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1D20] tracking-tight">
              Ixoriee Operating System
            </h2>
          </TextMaskReveal>
        </div>
        <p className="font-sans text-neutral-600 text-sm md:text-base max-w-md leading-relaxed">
          Drag the interactive divider to witness the tangible transition from chaotic manual work to an autonomous, edge-native digital suite.
        </p>
      </div>

      {/* Main Touch-Optimized Split Screen */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 select-none touch-none cursor-ew-resize bg-neutral-900 shadow-xl"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={(e) => isDragging && handlePointerMove(e.clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
      >
        {/* Right Side: Ixoriee Automated Cloud */}
        <div className="absolute inset-0 bg-[#141416] p-6 sm:p-12 flex flex-col justify-between text-white">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] sm:text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
              IXORIEE CLOUD: 100% AUTOMATED
            </span>
            <span className="font-mono text-xs text-neutral-400">STUDIO_OS_v2</span>
          </div>
          <div className="space-y-3 max-w-md my-auto">
            <div className="h-7 sm:h-8 w-3/4 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-white/5 rounded" />
            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 text-xs font-mono text-neutral-300 space-y-1">
              <div>● Live Student Check-in: Automated via QR</div>
              <div>● Revenue Reconciliation: Real-time ($0 manual entry)</div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-neutral-500">
            EDGE-NATIVE ARCHITECTURE • 0 SEC RUNTIME DELAY
          </div>
        </div>

        {/* Left Side: Manual Problem (Clipped via Polygon) */}
        <div 
          className="absolute inset-0 bg-[#F4F4F0] p-6 sm:p-12 flex flex-col justify-between text-[#1C1D20] border-r border-black/20"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] sm:text-xs text-red-600 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full font-bold">
              MANUAL FRICTION: 12 HRS/WK LOST
            </span>
            <span className="font-mono text-xs text-neutral-500">PAPER_LEDGER</span>
          </div>
          <div className="space-y-3 max-w-md my-auto">
            <div className="p-3.5 bg-black/5 rounded-xl border border-dashed border-black/20 text-xs font-mono text-neutral-600 line-through space-y-1">
              <div>✕ Missing attendance registers</div>
              <div>✕ Cash tracking errors in physical book</div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-neutral-500">
            LEGACY MANUAL LOGS • DISJOINTED SPREADSHEETS
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-black shadow-xl border border-black/10 flex items-center justify-center font-mono text-xs font-bold">
            ↔
          </div>
        </div>
      </div>

      {/* Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-5 rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="font-mono text-xs text-neutral-500">OPERATIONAL LATENCY</div>
          <div className="text-xl sm:text-2xl font-bold font-sans mt-1 text-[#1C1D20]">-94% Reduction</div>
        </div>
        <div className="p-5 rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="font-mono text-xs text-neutral-500">MANUAL LEDGER HOURS</div>
          <div className="text-xl sm:text-2xl font-bold font-sans mt-1 text-[#1C1D20]">0 hrs / week</div>
        </div>
        <div className="p-5 rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="font-mono text-xs text-neutral-500">SYSTEM ARCHITECTURE</div>
          <div className="text-xl sm:text-2xl font-bold font-sans mt-1 text-[#1C1D20]">Edge-Native Sync</div>
        </div>
      </div>
    </section>
  );
};
