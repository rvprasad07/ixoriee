"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICE_PILLARS } from "@/lib/data";
import { ServicePillar } from "@/types";
import { ArrowUpRight, Cpu, Layers, Bot, Rocket, Sparkles } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";
import { InquiryModal } from "./InquiryModal";

const pillarIcons: Record<string, React.ReactNode> = {
  "ui-ux": <Layers className="w-6 h-6 text-cyan-400" />,
  "saas-platforms": <Cpu className="w-6 h-6 text-blue-400" />,
  "agentic-ai": <Bot className="w-6 h-6 text-emerald-400" />,
  "brand-launchpad": <Rocket className="w-6 h-6 text-purple-400" />,
};

export const HorizontalServiceDeck: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    // Calculate total horizontal scroll width
    const totalWidth = section.scrollWidth - window.innerWidth + 120;

    const ctx = gsap.context(() => {
      gsap.to(section, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth * 1.2}`,
          invalidateOnRefresh: true,
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div id="services" ref={triggerRef} className="overflow-hidden bg-[#08080A]">
        <div className="pt-24 px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>[ 04 ARCHITECTURAL PILLARS ]</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Bespoke Engineering &amp; AI Engines
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-500 flex items-center gap-2">
            <span>SCROLL HORIZONTALLY</span>
            <span className="text-cyan-400 animate-pulse">→</span>
          </div>
        </div>

        {/* Horizontal Container Pinned By GSAP */}
        <div
          ref={sectionRef}
          className="flex items-center gap-8 py-16 px-6 md:px-16 w-fit min-h-[85vh] select-none"
        >
          {SERVICE_PILLARS.map((pillar: ServicePillar) => (
            <div
              key={pillar.id}
              className="w-[85vw] sm:w-[75vw] md:w-[58vw] lg:w-[48vw] h-[68vh] min-h-[500px] max-h-[660px] bg-[#0E0E12] border border-white/10 hover:border-cyan-400/40 rounded-3xl p-8 sm:p-10 md:p-12 flex flex-col justify-between flex-shrink-0 relative overflow-hidden group transition-all duration-300 shadow-2xl"
            >
              {/* Subtle Atmospheric Gradient Glow on Hover */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent-glow/5 group-hover:bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none transition-all duration-500" />

              {/* Top Header Card Info */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-cyan-400/30 transition-colors">
                      {pillarIcons[pillar.id]}
                    </div>
                    <div>
                      <span className="font-mono text-[11px] font-bold tracking-widest text-cyan-400 block">
                        {pillar.index} / {pillar.discipline}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-500">
                        PRODUCTION GRADE
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-3xl md:text-4xl font-bold text-white/10 group-hover:text-white/25 transition-colors">
                    {pillar.index}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-50 transition-colors">
                  {pillar.title}
                </h3>
                <p className="font-sans text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                  {pillar.summary || pillar.description}
                </p>
              </div>

              {/* Bottom Telemetry Tags & Action */}
              <div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {pillar.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-[#15151B] border border-white/10 text-neutral-300 group-hover:border-cyan-500/25 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Edge Optimized</span>
                  </div>

                  <button
                    onClick={() => setSelectedPillar(pillar.title)}
                    className="inline-flex items-center gap-2 font-mono text-xs text-white bg-white/10 hover:bg-white hover:text-black px-4 py-2 rounded-full transition-all duration-200"
                  >
                    <span>Request Pillar Scope</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InquiryModal
        isOpen={!!selectedPillar}
        onClose={() => setSelectedPillar(null)}
        initialService={selectedPillar || undefined}
      />
    </>
  );
};
