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
          className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 md:p-8 overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000000]/85 backdrop-blur-md"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            data-lenis-prevent="true"
            className="relative w-full max-w-6xl h-[88vh] max-h-[880px] bg-[#1C1D20] text-[#F4F4F6] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col overscroll-contain"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/10 bg-[#1C1D20] z-20 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-wider">
                  CASE STUDY ARCHIVE // {project.year}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className="font-mono text-[10px] text-[#10B981] font-bold">
                  PRODUCTION VERIFIED
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
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
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-8 bg-[#1C1D20]">
                <div>
                  <span className="font-mono text-xs text-neutral-400 font-semibold block mb-1">
                    {project.discipline}
                  </span>
                  <h3 className="font-sans text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                    {project.title}
                  </h3>

                  {project.tagline && (
                    <p className="font-mono text-xs text-neutral-300 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl inline-block mb-6">
                      {project.tagline}
                    </p>
                  )}

                  {/* Impact Metric Pill */}
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 mb-6">
                    <Sparkles className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                    <div>
                      <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-bold">
                        QUANTIFIED IMPACT
                      </span>
                      <span className="font-sans text-sm font-semibold text-white">
                        {project.metrics}
                      </span>
                    </div>
                  </div>

                  {/* Client Overview */}
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold">
                      Executive Overview
                    </h4>
                    <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                      {project.clientOverview ||
                        "Engineered from deep architectural research into an automated production suite eliminating manual workflow friction."}
                    </p>
                  </div>
                </div>

                {/* Tech Stack & Action Group */}
                <div className="space-y-6 pt-6 border-t border-white/10">
                  {project.stack && (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2.5">
                        Technical Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item, idx) => (
                          <span
                            key={idx}
                            className="font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    {onOpenInquiry && (
                      <MagneticWrapper onClick={onOpenInquiry}>
                        <button className="w-full sm:w-auto bg-white text-black px-7 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg">
                          Commission Similar Build
                        </button>
                      </MagneticWrapper>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Extensive Scrollable Media & System Schematics */}
              <div
                data-lenis-prevent="true"
                className="lg:col-span-7 p-6 sm:p-10 space-y-8 bg-[#141416]/80 overflow-y-auto overscroll-contain"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-bold">
                    System Schematics &amp; Production Architecture
                  </h4>
                  <span className="font-mono text-[10px] text-neutral-500">
                    SCROLL DOWN TO INSPECT FULL SUITE ↓
                  </span>
                </div>

                {/* Simulated Screen 01: Core Operational Dashboard */}
                <div className="w-full bg-[#1C1D20] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-white font-bold flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      01 / OPERATIONAL DASHBOARD &amp; PORTAL
                    </span>
                    <span className="font-mono text-[10px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded">
                      DESKTOP 16:9
                    </span>
                  </div>
                  <div className="h-52 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div className="h-3.5 w-40 bg-white/20 rounded" />
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                        <span className="font-mono text-[10px] text-emerald-400">EDGE SYNC</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 my-auto">
                      <div className="h-20 rounded bg-white/5 border border-white/5 p-3 flex flex-col justify-between">
                        <span className="font-mono text-[9px] text-neutral-400">TELEMETRY UPTIME</span>
                        <span className="font-mono text-sm font-bold text-white">99.98%</span>
                      </div>
                      <div className="h-20 rounded bg-white/5 border border-white/5 p-3 flex flex-col justify-between">
                        <span className="font-mono text-[9px] text-neutral-400">AUTOMATION LOGIC</span>
                        <span className="font-mono text-sm font-bold text-[#10B981]">100% ACTIVE</span>
                      </div>
                      <div className="h-20 rounded bg-white/5 border border-white/5 p-3 flex flex-col justify-between">
                        <span className="font-mono text-[9px] text-neutral-400">RESPONSE LATENCY</span>
                        <span className="font-mono text-sm font-bold text-white">&lt; 34ms</span>
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-white/10 rounded" />
                  </div>
                </div>

                {/* Simulated Screen 02: Real-Time Event Stream */}
                <div className="w-full bg-[#1C1D20] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-white font-bold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#10B981]" />
                      02 / REAL-TIME EVENT STREAM &amp; WORKERS
                    </span>
                    <span className="font-mono text-[10px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded">
                      EDGE LOGS
                    </span>
                  </div>
                  <div className="space-y-2.5 font-mono text-xs text-neutral-300 bg-black/50 p-5 rounded-xl border border-white/5">
                    <div className="text-emerald-400">
                      ✓ [200 OK] Ingested webhook payload via Edge Router
                    </div>
                    <div className="text-neutral-400">
                      → Dispatched auto-reconciliation background job (Duration: 14ms)
                    </div>
                    <div className="text-neutral-400">
                      → Executed dynamic token generation &amp; database write
                    </div>
                    <div className="text-cyan-400">
                      ✓ Real-time WebSocket broadcast synchronized across active clients
                    </div>
                  </div>
                </div>

                {/* Simulated Screen 03: Data Architecture & Storage Topology */}
                <div className="w-full bg-[#1C1D20] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-white font-bold flex items-center gap-2">
                      <Database className="w-4 h-4 text-purple-400" />
                      03 / STORAGE TOPOLOGY &amp; SECURITY
                    </span>
                    <span className="font-mono text-[10px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded">
                      DISTRIBUTED POSTGRES
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <span className="font-mono text-[10px] text-neutral-400 block">ENCRYPTION PROTOCOL</span>
                      <span className="font-sans text-xs font-semibold text-white">AES-256 at Rest &amp; in Transit</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <span className="font-mono text-[10px] text-neutral-400 block">REPLICATION SLA</span>
                      <span className="font-sans text-xs font-semibold text-[#10B981]">Continuous 1-Second RPO</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Screen 04: Mobile Responsive Engine */}
                <div className="w-full bg-[#1C1D20] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-white font-bold flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-amber-400" />
                      04 / MOBILE-FIRST CLIENT INTERACTION
                    </span>
                    <span className="font-mono text-[10px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded">
                      60-120 FPS
                    </span>
                  </div>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                    Designed for instantaneous sub-second touch response, offline caching, and responsive viewport elasticity across iPhone, iPad, and high-density Android displays.
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
