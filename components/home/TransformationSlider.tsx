"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { TextMaskReveal } from "../common/TextMaskReveal";
import {
  FileWarning,
  Clock,
  AlertTriangle,
  QrCode,
  CreditCard,
  Users,
  CheckCircle2,
  ArrowLeftRight,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export const TransformationSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
      window.addEventListener("touchcancel", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchcancel", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section id="transformation-slider" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto z-10 relative">
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

      {/* Main Interactive Split Card Container (Preserves vertical page scrolling via touch-pan-y) */}
      <div
        ref={containerRef}
        className="relative w-full h-[620px] sm:h-[560px] rounded-3xl overflow-hidden border border-black/10 bg-white shadow-xl select-none touch-pan-y"
      >
        {/* ======================================================== */}
        {/* RIGHT LAYER: IXORIEE DIGITAL CLOUD SUITE (Studio White)  */}
        {/* ======================================================== */}
        <div className="absolute inset-0 bg-[#FFFFFF] p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between border-b border-black/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#10B981]">
                [ IXORIEE CLOUD: 100% Automated ]
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Edge Sync Locked • 0ms Latency</span>
            </div>
          </div>

          {/* SaaS Interface Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
            {/* Live QR Scan Terminal */}
            <div className="bg-[#F4F4F0] border border-black/5 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-neutral-600 font-bold flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#1C1D20]" />
                  QR Scan Terminal
                </span>
                <span className="font-mono text-[10px] bg-[#10B981]/15 text-[#10B981] font-bold px-2 py-0.5 rounded-full">
                  LIVE CHECK-IN
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-black/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#1C1D20] text-white font-mono text-xs flex items-center justify-center font-bold">
                      AV
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1C1D20]">Anya Vance</div>
                      <div className="text-[10px] text-neutral-500">Contemporary Masterclass</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-[#10B981] font-bold">10:45:02</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-black/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-neutral-200 text-[#1C1D20] font-mono text-xs flex items-center justify-center font-bold">
                      RK
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1C1D20]">Rohan Kapoor</div>
                      <div className="text-[10px] text-neutral-500">Hip-Hop Advanced Batch</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-[#10B981] font-bold">10:43:18</span>
                </div>
              </div>
            </div>

            {/* Auto-Debit Ledger */}
            <div className="bg-[#F4F4F0] border border-black/5 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-neutral-600 font-bold flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#1C1D20]" />
                  Auto-Debit Ledger
                </span>
                <span className="font-mono text-[10px] bg-black/5 text-[#1C1D20] px-2 py-0.5 rounded-full font-bold">
                  STRIPE SYNC
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500">Monthly Subscriptions</span>
                  <span className="font-mono text-[#1C1D20] font-bold">$18,450.00</span>
                </div>
                <div className="w-full bg-black/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#10B981] h-full w-[98%]" />
                </div>
                <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono pt-1">
                  <span>98.8% Auto-Collected</span>
                  <span className="text-[#10B981] font-bold">0 Overdue Invoices</span>
                </div>
              </div>
              <div className="mt-4 p-2 bg-white rounded-lg border border-black/5 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                <span className="text-[10px] font-mono text-neutral-700">
                  Daily revenue reconciliation automated
                </span>
              </div>
            </div>

            {/* Studio Utilization */}
            <div className="hidden md:flex flex-col justify-between bg-[#F4F4F0] border border-black/5 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-neutral-600 font-bold flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#1C1D20]" />
                  Studio Utilization
                </span>
                <span className="font-mono text-[10px] text-neutral-500">3 Studios</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#1C1D20]">Studio A (Main Hall)</span>
                  <span className="font-mono text-[#10B981] font-semibold">92% Cap</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#1C1D20]">Studio B (Ballet Wing)</span>
                  <span className="font-mono text-[#10B981] font-semibold">84% Cap</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#1C1D20]">Studio C (Private Pod)</span>
                  <span className="font-mono text-[#10B981] font-semibold">100% Booked</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-neutral-600">
                <TrendingUp className="w-3 h-3 text-[#10B981]" />
                <span>Zero schedule overlaps detected</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Mini */}
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-2 border-t border-black/5">
            <span>DATABASE: DISTRIBUTED POSTGRESQL</span>
            <span>BACKUP FREQUENCY: CONTINUOUS 1s REPLICATION</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LEFT LAYER: THE MANUAL PROBLEM (Full Clean Clip-Path)     */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 bg-[#ECE5D8] border-r border-[#C4B7A6] p-6 sm:p-10 flex flex-col justify-between overflow-hidden shadow-xl"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          {/* Subtle paper grain texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#b8a994_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Top Status Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#C4B7A6] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-red-700">
                [ MANUAL FRICTION: 12 hrs/wk lost ]
              </span>
            </div>
            <span className="font-mono text-[10px] text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded border border-amber-300">
              DISCONNECTED SPREADSHEETS
            </span>
          </div>

          {/* Paper Ledger Content */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 my-auto max-w-3xl">
            <div className="bg-[#DFD5C4] border border-[#BDB09E] rounded-xl p-4 shadow-inner">
              <div className="flex items-center justify-between text-amber-950 font-mono text-xs mb-3">
                <span className="flex items-center gap-1.5 font-bold">
                  <FileWarning className="w-4 h-4 text-red-700" />
                  Physical Ledger #04
                </span>
                <span className="text-red-700 text-[10px] border border-red-700/40 px-1.5 py-0.5 rounded font-bold uppercase rotate-[-3deg]">
                  OVERDUE FEES
                </span>
              </div>
              <div className="space-y-2 text-xs font-mono text-amber-950">
                <div className="p-2 bg-red-100/80 border border-red-300 rounded flex justify-between items-center line-through text-red-900">
                  <span>Student #104 (Rahul M.)</span>
                  <span>Fee pending $240</span>
                </div>
                <div className="p-2 bg-amber-100/80 border border-amber-300 rounded flex justify-between items-center">
                  <span>Manual Cash Deposit</span>
                  <span className="text-red-700 font-bold">Unreconciled</span>
                </div>
                <div className="p-2 bg-red-100/80 border border-red-300 rounded flex justify-between items-center text-red-900">
                  <span>Attendance Slip Missing</span>
                  <span className="text-red-700 text-[10px] font-bold">LOST SHEET</span>
                </div>
              </div>
            </div>

            <div className="bg-[#DFD5C4] border border-[#BDB09E] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-red-800 font-bold flex items-center gap-1.5 mb-2">
                  <Clock className="w-4 h-4" />
                  Weekly Time Waste Log
                </span>
                <ul className="text-xs text-amber-950 space-y-1.5 font-mono">
                  <li>• Calling parents for unpaid dues: 5 hrs</li>
                  <li>• Re-typing student names into Excel: 4 hrs</li>
                  <li>• Resolving double-booking clashes: 3 hrs</li>
                </ul>
              </div>
              <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-[11px] font-mono text-red-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-700 flex-shrink-0" />
                <span>Annual revenue leakage: ~$14,200</span>
              </div>
            </div>
          </div>

          {/* Bottom Alert */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-amber-950 pt-2 border-t border-[#C4B7A6]">
            <span>RISK: HUMAN ERROR &amp; SCALING CEILING</span>
            <span className="text-red-700 font-bold">CRITICAL BOTTLENECK</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DRAGGABLE DIVIDER HANDLE & KNOB (Active touch listener only on the handle) */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-y-0 w-8 -ml-4 z-30 cursor-ew-resize touch-none flex items-center justify-center group"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsDragging(true);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setIsDragging(true);
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            setIsDragging(true);
          }}
        >
          {/* Vertical Divider Hairline */}
          <div className="w-0.5 h-full bg-[#1C1D20] shadow-md group-hover:w-1 transition-all" />

          {/* Draggable Knob (Enlarged 48x48 for effortless mobile thumb touch) */}
          <div className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1C1D20] text-white flex items-center justify-center shadow-2xl border-2 border-white pointer-events-auto hover:scale-110 active:scale-95 transition-transform">
            <ArrowLeftRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Telemetry Bar Below Slider */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-black/10 flex flex-col justify-between shadow-sm">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
            Operational Latency
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-sans text-3xl md:text-4xl font-bold text-[#1C1D20]">
              -94%
            </span>
            <span className="font-mono text-xs text-[#10B981] font-bold">Reduction</span>
          </div>
          <p className="mt-2 text-xs font-sans text-neutral-600">
            Instant check-in processing replaces 15-minute reception queues.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-black/10 flex flex-col justify-between shadow-sm">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
            Manual Data Entry
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-sans text-3xl md:text-4xl font-bold text-[#1C1D20]">
              0 hrs
            </span>
            <span className="font-mono text-xs text-[#10B981] font-bold">/ week</span>
          </div>
          <p className="mt-2 text-xs font-sans text-neutral-600">
            100% automated invoicing, payroll calculation, and seat allocation.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-black/10 flex flex-col justify-between shadow-sm">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
            System Architecture
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-sans text-2xl md:text-3xl font-bold text-[#1C1D20]">
              Edge-Native
            </span>
            <span className="font-mono text-xs text-neutral-500 font-medium">/ Real-time</span>
          </div>
          <p className="mt-2 text-xs font-sans text-neutral-600">
            Distributed Postgres with optimistic offline client synchronization.
          </p>
        </div>
      </div>
    </section>
  );
};
