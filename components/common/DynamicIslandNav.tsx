"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { MagneticWrapper } from "./MagneticWrapper";

interface NavProps {
  onOpenDrawer: () => void;
}

export const DynamicIslandNav: React.FC<NavProps> = ({ onOpenDrawer }) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const istTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());
      setTime(istTime);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 mx-auto w-[92%] sm:w-fit max-w-4xl z-50">
      <nav className="px-4 sm:px-6 py-2.5 rounded-full bg-white/85 dark:bg-[#141416]/85 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex items-center justify-between sm:gap-8 transition-colors duration-500 min-h-[44px]">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold tracking-widest text-[#1C1D20] dark:text-white">
            IXORIEE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Desktop-Only Anchors */}
        <div className="hidden md:flex items-center gap-6 text-xs text-neutral-600 dark:text-neutral-400 font-sans">
          <button onClick={() => scrollTo("services")} className="hover:text-black dark:hover:text-white transition-colors">
            Services
          </button>
          <button onClick={() => scrollTo("methodology")} className="hover:text-black dark:hover:text-white transition-colors">
            Process
          </button>
          <button onClick={() => scrollTo("works")} className="hover:text-black dark:hover:text-white transition-colors">
            Works
          </button>
        </div>

        {/* Desktop-Only Clock */}
        <div className="hidden lg:block font-mono text-[10px] text-neutral-500">
          ASIA/KOLKATA — {time || "12:00:00 PM"}
        </div>

        {/* Action Button (Min 44px tap target) */}
        <div className="flex items-center">
          <MagneticWrapper onClick={onOpenDrawer}>
            <button className="bg-[#1C1D20] text-white dark:bg-white dark:text-black text-xs font-semibold px-4 py-2 min-h-[36px] rounded-full active:scale-95 transition-transform flex items-center gap-1.5 shadow-sm">
              <span>Book Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </MagneticWrapper>
        </div>
      </nav>
    </header>
  );
};
