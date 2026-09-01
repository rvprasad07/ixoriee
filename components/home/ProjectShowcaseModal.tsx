"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectRecord } from "@/types";
import {
  X,
  Sparkles,
  CheckCircle2,
  Shield,
  Layers,
  Cpu,
  Code2,
  Database,
  Smartphone,
  Server,
  Activity,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";
import { MagneticWrapper } from "../common/MagneticWrapper";

interface ProjectShowcaseModalProps {
  project: ProjectRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: () => void;
}

export const ProjectShowcaseModal: React.FC<ProjectShowcaseModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  // Lock body scroll when modal is open so background never moves
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-6 md:p-8 overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000000]/90 backdrop-blur-md z-0"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            data-lenis-prevent="true"
            className="relative w-full max-w-6xl h-[92vh] sm:h-[88vh] max-h-[880px] bg-[#1C1D20] text-[#F4F4F6] border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col overscroll-contain"
          >
            {/* Top Bar Header (Optimized with high-contrast mobile close button) */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-white/10 bg-[#141416] z-30 flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={onClose}
                  className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white font-mono text-xs font-bold hover:bg-white hover:text-black transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <span className="font-mono text-[11px] sm:text-xs text-neutral-300 font-bold uppercase tracking-wider">
                  CASE STUDY // {project.year}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] hidden xs:inline-block" />
                <span className="font-mono text-[10px] text-[#10B981] font-bold hidden sm:inline-block">
                  PRODUCTION VERIFIED
                </span>
              </div>

              {/* Desktop & Mobile Close Trigger */}
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-black text-white text-xs font-mono transition-colors shadow-sm"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            {/* Scrollable Dual Column Grid */}
            <div
              data-lenis-prevent="true"
              className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 divide-y lg:divide-y-0 lg:divide-x divide-white/10 overscroll-contain select-text"
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Left Column: Sticky Specs & Impact Overview */}
              <div className="lg:col-span-5 p-5 sm:p-10 flex flex-col justify-between space-y-6 sm:space-y-8 bg-[#1C1D20]">
                <div>
                  <span className="font-mono text-xs text-neutral-400 font-semibold block mb-1">
                    {project.discipline}
                  </span>
                  <h3 className="font-sans text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3 sm:mb-4">
                    {project.title}
                  </h3>

                  {project.tagline && (
                    <p className="font-mono text-xs text-neutral-300 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl inline-block mb-4 sm:mb-6">
                      {project.tagline}
                    </p>
                  )}

                  {/* Impact Metric Pill */}
                  <div className="p-3.5 sm:p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 mb-4 sm:mb-6">
                    <Sparkles className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                    <div>
                      <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-bold">
                        QUANTIFIED IMPACT
                      </span>
                      <span className="font-sans text-xs sm:text-sm font-semibold text-white">
                        {project.metrics}
                      </span>
                    </div>
                  </div>

                  {/* Client Overview */}
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold">
                      Executive Overview
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {project.clientOverview ||
                        "Engineered from deep architectural research into an automated production suite eliminating manual workflow friction."}
                    </p>
                  </div>
                </div>

                {/* Tech Stack & Action Group */}
                <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t border-white/10">
                  {project.stack && (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">
                        Technical Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.stack.map((item, idx) => (
                          <span
                            key={idx}
                            className="font-mono text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    {onOpenInquiry && (
                      <MagneticWrapper onClick={onOpenInquiry}>
                        <button className="w-full bg-white text-black px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg">
                          Commission Similar Build
                        </button>
                      </MagneticWrapper>
                    )}

                    <button
                      onClick={onClose}
                      className="sm:hidden w-full bg-white/10 text-white px-6 py-3 rounded-full font-mono text-xs hover:bg-white/20 transition-colors"
                    >
                      Close Case Study
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Extensive Scrollable Media & System Schematics */}
              <div
                data-lenis-prevent="true"
                className="lg:col-span-7 p-5 sm:p-10 space-y-6 sm:space-y-8 bg-[#141416]/80 overflow-y-auto overscroll-contain"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-bold">
                    System Schematics &amp; Production Architecture
                  </h4>
                  <span className="font-mono text-[10px] text-neutral-500">
                    SCROLL TO INSPECT ↓
                  </span>
                </div>

                {/* Simulated Screen 01: Core Operational Dashboard */}
                <div className="w-full bg-[#1C1D20] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-white font-bold flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      01 / OPERATIONAL DASHBOARD
                    </span>
                    <span className="font-mono text-[10px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded">
                      DESKTOP 16:9
                    </span>
                  </div>
                  <div className="h-44 sm:h-52 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 p-3 sm:p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div className="h-3.5 w-32 sm:w-40 bg-white/20 rounded" />
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                        <span className="font-mono text-[10px] text-emerald-400">EDGE SYNC</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 my-auto">
                      <div className="h-16 sm:h-20 rounded bg-white/5 border border-white/5 p-2 sm:p-3 flex flex-col justify-between">
                        <span className="font-mono text-[8px] sm:text-[9px] text-neutral-400 truncate">UPTIME</span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-white">99.98%</span>
                      </div>
                      <div className="h-16 sm:h-20 rounded bg-white/5 border border-white/5 p-2 sm:p-3 flex flex-col justify-between">
                        <span className="font-mono text-[8px] sm:text-[9px] text-neutral-400 truncate">AUTOMATION</span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#10B981]">100%</span>
                      </div>
                      <div className="h-16 sm:h-20 rounded bg-white/5 border border-white/5 p-2 sm:p-3 flex flex-col justify-between">
                        <span className="font-mono text-[8px] sm:text-[9px] text-neutral-400 truncate">LATENCY</span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-white">&lt; 34ms</span>
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-white/10 rounded" />
                  </div>
                </div>

                {/* Simulated Screen 02: Real-Time Event Stream */}
                <div className="w-full bg-[#1C1D20] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-white font-bold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#10B981]" />
                      02 / REAL-TIME EVENT STREAM
                    </span>
                    <span className="font-mono text-[10px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded">
                      LOGS
                    </span>
                  </div>
                  <div className="space-y-2 font-mono text-[11px] sm:text-xs text-neutral-300 bg-black/50 p-4 sm:p-5 rounded-xl border border-white/5">
                    <div className="text-emerald-400">
                      ✓ [200 OK] Ingested webhook payload via Edge Router
                    </div>
                    <div className="text-neutral-400">
                      → Dispatched auto-reconciliation background job (14ms)
                    </div>
                    <div className="text-neutral-400">
                      → Executed dynamic token generation &amp; database write
                    </div>
                    <div className="text-cyan-400">
                      ✓ Real-time WebSocket broadcast synchronized across active clients
                    </div>
                  </div>
                </div>

                {/* Simulated Screen 03: Data Architecture */}
                <div className="w-full bg-[#1C1D20] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-white font-bold flex items-center gap-2">
                      <Database className="w-4 h-4 text-purple-400" />
                      03 / STORAGE TOPOLOGY &amp; SECURITY
                    </span>
                    <span className="font-mono text-[10px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded">
                      DISTRIBUTED POSTGRES
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <span className="font-mono text-[10px] text-neutral-400 block">ENCRYPTION PROTOCOL</span>
                      <span className="font-sans text-xs font-semibold text-white">AES-256 at Rest &amp; Transit</span>
                    </div>
                    <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <span className="font-mono text-[10px] text-neutral-400 block">REPLICATION SLA</span>
                      <span className="font-sans text-xs font-semibold text-[#10B981]">Continuous 1s Replication</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Screen 04: Mobile Responsive Engine */}
                <div className="w-full bg-[#1C1D20] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-white font-bold flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-amber-400" />
                      04 / MOBILE CLIENT INTERACTION
                    </span>
                    <span className="font-mono text-[10px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded">
                      60-120 FPS
                    </span>
                  </div>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                    Sub-second touch response, offline caching, and responsive viewport elasticity across iPhone and Android devices.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
