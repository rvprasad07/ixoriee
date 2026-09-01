"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICE_PILLARS } from "@/lib/data";
import { TextMaskReveal } from "../common/TextMaskReveal";
import { Plus, Minus, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { MagneticWrapper } from "../common/MagneticWrapper";

interface ServicesExpandingMatrixProps {
  onSelectScope?: (scope: string) => void;
}

export const ServicesExpandingMatrix: React.FC<ServicesExpandingMatrixProps> = ({
  onSelectScope,
}) => {
  // Default first row expanded
  const [expandedId, setExpandedId] = useState<string | null>("ui-ux");

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-28 px-4 sm:px-6 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-black/10 pb-8 gap-6">
        <div>
          <TextMaskReveal>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C1D20]" />
              <span>[ 04 ARCHITECTURAL PILLARS ]</span>
            </div>
          </TextMaskReveal>
          <TextMaskReveal delay={0.1}>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1D20] tracking-tight">
              Bespoke Engineering &amp; AI Engines
            </h2>
          </TextMaskReveal>
        </div>
        <p className="font-sans text-neutral-600 text-sm md:text-base max-w-md leading-relaxed">
          Explore our vertical service matrix. Click any pillar to inspect deep architectural specifications and delivered artifacts.
        </p>
      </div>

      {/* Swiss Vertical Accordion Rows */}
      <div className="divide-y divide-black/10 border-t border-b border-black/10 bg-white rounded-3xl overflow-hidden shadow-md">
        {SERVICE_PILLARS.map((pillar) => {
          const isExpanded = expandedId === pillar.id;

          return (
            <div
              key={pillar.id}
              className={`transition-colors duration-300 ${
                isExpanded ? "bg-[#FAF9F5]" : "hover:bg-[#FAF9F5]/60"
              }`}
            >
              {/* Row Header Trigger */}
              <div
                onClick={() => toggleRow(pillar.id)}
                className="p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start md:items-center gap-6 md:gap-12">
                  <span className="font-mono text-base sm:text-lg font-bold text-neutral-400 w-8">
                    {pillar.index}
                  </span>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 block mb-1">
                      {pillar.discipline}
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-semibold text-[#1C1D20]">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pl-14 md:pl-0">
                  <p className="hidden xl:block font-sans text-sm text-neutral-600 max-w-sm text-right">
                    {pillar.summary}
                  </p>
                  <div className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-[#1C1D20] shadow-sm">
                    {isExpanded ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanding Content Panel */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-10 pb-10 pt-2 border-t border-black/5 grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Deep Specification Details */}
                      <div className="lg:col-span-7 space-y-4">
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">
                          Architecture &amp; Execution Scope
                        </h4>
                        <p className="font-sans text-base text-[#1C1D20] leading-relaxed">
                          {pillar.expandedDetails}
                        </p>
                        <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                          {pillar.summary}
                        </p>
                      </div>

                      {/* Right: Technical Stack Pills & Action */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                        <div>
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                            Production Stack Surface
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {pillar.tags.map((tag, tagIdx) => (
                              <span
                                key={tagIdx}
                                className="font-mono text-xs px-3 py-1.5 rounded-full bg-white border border-black/10 text-[#1C1D20] shadow-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 flex items-center justify-between border-t border-black/5">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-[#10B981] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Zero-Downtime Guarantee</span>
                          </div>

                          {onSelectScope && (
                            <MagneticWrapper onClick={() => onSelectScope(pillar.title)}>
                              <button className="flex items-center gap-1.5 bg-[#1C1D20] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-colors shadow-sm">
                                <span>Request Pillar Brief</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </MagneticWrapper>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
