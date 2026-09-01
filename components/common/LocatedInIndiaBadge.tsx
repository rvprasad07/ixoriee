"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const LocatedInIndiaBadge: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.aside
      aria-label="Studio Location"
      initial={{ x: -120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: 0.8,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute bottom-8 left-0 z-30 select-none group pointer-events-auto"
    >
      <div className="flex items-center bg-[#1C1D20] text-white pl-5 pr-2 py-2 rounded-r-full border border-white/15 border-l-0 shadow-[0_10px_35px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 group-hover:pl-6 group-hover:shadow-[0_15px_45px_rgba(0,0,0,0.6)]">
        {/* Editorial Text */}
        <div className="font-sans text-xs sm:text-[13px] font-medium leading-[1.25] text-neutral-100 pr-3 tracking-tight">
          <div>Located</div>
          <div>in India</div>
        </div>

        {/* Circular Rotating Globe Icon Holder */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#71717A]/40 border border-white/15 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-[spin_12s_linear_infinite]"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
            <path d="M4.93 4.93a12.9 12.9 0 0 0 0 14.14" />
            <path d="M19.07 4.93a12.9 12.9 0 0 1 0 14.14" />
          </svg>
        </div>
      </div>
    </motion.aside>
  );
};
