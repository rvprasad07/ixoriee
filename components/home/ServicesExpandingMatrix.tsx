"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICE_PILLARS } from "@/lib/data";
import { TextMaskReveal } from "../common/TextMaskReveal";
import { Plus, Minus, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useDrawer } from "@/context/DrawerContext";

export const ServicesExpandingMatrix: React.FC = () => {
  // Default first row expanded
  const [expandedId, setExpandedId] = useState<string | null>("ui-ux");
  const { openDrawer, currency } = useDrawer();

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10 relative">
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
          Explore our vertical service matrix. Click any pillar to inspect deep architectural specifications, tier benchmarks, and production stack surfaces.
        </p>
      </div>

      {/* Swiss Vertical Accordion Rows */}
      <div className="divide-y divide-black/10 border-t border-b border-black/10 bg-white rounded-3xl overflow-hidden shadow-lg">
        {SERVICE_PILLARS.map((pillar, idx) => {
          const isExpanded = expandedId === pillar.id;
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={pillar.id}
              initial={{
                opacity: 0,
                x: isEven ? 100 : -100,
                scale: 0.98,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 22,
                delay: idx * 0.1,
              }}
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
                  <div className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-[#1C1D20] shadow-sm flex-shrink-0">
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
                    <div className="px-6 sm:px-10 pb-12 pt-4 border-t border-black/5 space-y-10">
                      {/* Top Row: Narrative & Stack */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left: Deep Specification Details */}
                        <div className="lg:col-span-7 space-y-3">
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1C1D20]" />
                            Architecture &amp; Execution Scope
                          </h4>
                          <p className="font-sans text-base text-[#1C1D20] leading-relaxed">
                            {pillar.expandedDetails}
                          </p>
                          <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                            {pillar.summary}
                          </p>
                        </div>

                        {/* Right: Technical Stack Surface */}
                        <div className="lg:col-span-5 space-y-3">
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                            Production Stack Surface
                          </h4>
                          <div className="flex flex-wrap gap-2 pt-1">
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
                      </div>

                      {/* 3-Column Swiss Sub-Grid (Convention B Tiers) */}
                      <div className="pt-6 border-t border-black/10">
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">
                            Available Engagement Tiers
                          </h4>
                          <span className="font-mono text-[11px] text-neutral-500">
                            Currency: <strong className="text-[#1C1D20]">{currency}</strong>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          {pillar.tiers.map((tier, tierIdx) => (
                            <div
                              key={tier.id}
                              className="bg-white rounded-2xl p-6 border border-black/10 shadow-sm flex flex-col justify-between hover:border-black/30 hover:shadow-md transition-all group"
                            >
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-xs font-bold text-neutral-400">
                                    0{tierIdx + 1}.
                                  </span>
                                  {tier.badge && (
                                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#F4F4F0] text-[#1C1D20] border border-black/5">
                                      {tier.badge}
                                    </span>
                                  )}
                                </div>

                                <div>
                                  <h5 className="font-sans text-lg font-bold text-[#1C1D20]">
                                    {tier.name}
                                  </h5>
                                  <p className="font-sans text-xs text-neutral-600 mt-1 leading-relaxed">
                                    {tier.description}
                                  </p>
                                </div>

                                <div className="pt-2">
                                  <span className="font-mono text-lg font-bold text-[#1C1D20] block">
                                    {currency === "INR" ? tier.priceINR : tier.priceUSD}
                                  </span>
                                </div>

                                <ul className="space-y-2 pt-2 border-t border-black/5">
                                  {tier.features.map((feat, fIdx) => (
                                    <li
                                      key={fIdx}
                                      className="flex items-start gap-2 text-xs font-sans text-neutral-700"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                                      <span>{feat}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="pt-6 mt-6 border-t border-black/5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openDrawer({
                                      pillarId: pillar.id,
                                      pillarTitle: pillar.title,
                                      tierId: tier.id,
                                      tierName: tier.name,
                                      currency,
                                    });
                                  }}
                                  className="w-full flex items-center justify-center gap-2 bg-[#F4F4F0] group-hover:bg-[#1C1D20] text-[#1C1D20] group-hover:text-white text-xs font-semibold py-3 px-4 rounded-xl transition-all shadow-sm"
                                >
                                  <span>Select This Tier</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
