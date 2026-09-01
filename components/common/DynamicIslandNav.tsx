"use client";

import React from "react";
import { useLiveTime } from "@/hooks/useLiveTime";
import { MagneticWrapper } from "./MagneticWrapper";
import { ArrowUpRight } from "lucide-react";

interface DynamicIslandNavProps {
  onOpenDrawer: () => void;
}

export const DynamicIslandNav: React.FC<DynamicIslandNavProps> = ({ onOpenDrawer }) => {
  const { timeString, mounted } = useLiveTime();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-6 inset-x-0 mx-auto w-[92%] sm:w-fit z-50 px-4 sm:px-6 py-2.5 rounded-full bg-white/85 dark:bg-[#141416]/85 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex items-center justify-between sm:justify-start gap-4 md:gap-8 transition-colors duration-500">
      {/* Brand */}
      <a
        href="#"
        className="flex items-center gap-1.5 font-mono text-xs tracking-widest font-bold text-[#1C1D20] dark:text-white transition-colors"
      >
        <span>IXORIEE</span>
        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-normal">
          [SYS_v1.0]
        </span>
      </a>

      {/* Nav Links */}
      <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-neutral-500 dark:text-neutral-400">
        <button
          onClick={() => scrollTo("services")}
          className="hover:text-[#1C1D20] dark:hover:text-white transition-colors"
        >
          Services
        </button>
        <button
          onClick={() => scrollTo("methodology")}
          className="hover:text-[#1C1D20] dark:hover:text-white transition-colors"
        >
          Process
        </button>
        <button
          onClick={() => scrollTo("works")}
          className="hover:text-[#1C1D20] dark:hover:text-white transition-colors"
        >
          Works
        </button>
      </div>

      {/* Live Telemetry Indicator */}
      <div className="hidden md:flex items-center gap-2 pl-2 border-l border-black/10 dark:border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
        </span>
        <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 tracking-wider font-semibold">
          AVAILABLE FOR CONTRACTS
        </span>
      </div>

      {/* Timezone Readout */}
      <div className="hidden xl:flex items-center gap-1.5 font-mono text-[10px] text-neutral-500 dark:text-neutral-400 border-l border-black/10 dark:border-white/10 pl-4">
        <span className="text-neutral-400 dark:text-neutral-600 font-bold">INDIA:</span>
        <span>ASIA/KOLKATA (IST) — [{mounted ? timeString : "11:20:00 AM"}]</span>
      </div>

      {/* CTA Button */}
      <div className="flex items-center">
        <MagneticWrapper onClick={onOpenDrawer}>
          <button className="flex items-center gap-1.5 bg-[#1C1D20] text-white dark:bg-white dark:text-black text-xs font-semibold px-4 py-1.5 rounded-full hover:scale-105 transition-all shadow-sm">
            <span>Book Intro Call</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </MagneticWrapper>
      </div>
    </nav>
  );
};
