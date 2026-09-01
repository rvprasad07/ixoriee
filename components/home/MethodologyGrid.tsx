"use client";

import React from "react";
import { METHODOLOGY_STEPS } from "@/lib/data";
import { TextMaskReveal } from "../common/TextMaskReveal";
import { Search, BrainCircuit, Rocket, CheckCircle2 } from "lucide-react";

const stepIcons: Record<string, React.ReactNode> = {
  investigation: <Search className="w-5 h-5 text-[#1C1D20]" />,
  synthesis: <BrainCircuit className="w-5 h-5 text-[#1C1D20]" />,
  deployment: <Rocket className="w-5 h-5 text-[#1C1D20]" />,
};

export const MethodologyGrid: React.FC = () => {
  return (
    <section id="methodology" className="py-28 px-4 sm:px-6 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-black/10 pb-8 gap-6">
        <div>
          <TextMaskReveal>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C1D20]" />
              <span>[ SYSTEM ENGINEERING PROTOCOL ]</span>
            </div>
          </TextMaskReveal>
          <TextMaskReveal delay={0.1}>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1D20] tracking-tight">
              The 3-Step Methodology
            </h2>
          </TextMaskReveal>
        </div>
        <p className="font-sans text-neutral-600 text-sm md:text-base max-w-md leading-relaxed">
          How we fuse artificial intelligence velocity with rigorous human architecture to eliminate friction and ship enterprise software.
        </p>
      </div>

      {/* Swiss 3-Column Architectural Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-black/10 bg-white rounded-3xl overflow-hidden shadow-md">
        {METHODOLOGY_STEPS.map((step) => (
          <div
            key={step.id}
            className="p-8 md:p-12 border-b md:border-b-0 md:border-r last:border-r-0 border-black/10 flex flex-col justify-between min-h-[420px] hover:bg-[#FAF9F5] transition-colors"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs text-[#1C1D20] font-bold tracking-wider bg-[#F4F4F0] border border-black/10 px-3 py-1 rounded-full">
                  {step.badge}
                </span>
                <div className="p-2.5 bg-[#F4F4F0] rounded-xl border border-black/5">
                  {stepIcons[step.id]}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-sans text-2xl font-semibold text-[#1C1D20] mb-4">
                {step.title}
              </h3>
              <p className="font-sans text-sm md:text-base text-neutral-600 leading-relaxed mb-6">
                {step.description}
              </p>
            </div>

            {/* Checklist items */}
            <div className="pt-6 border-t border-black/5 space-y-2.5">
              {step.subPoints.map((point, pointIdx) => (
                <div key={pointIdx} className="flex items-start gap-2.5 text-xs font-mono text-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
