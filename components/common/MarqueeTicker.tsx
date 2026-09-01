"use client";

import React from "react";
import { motion } from "framer-motion";

interface MarqueeTickerProps {
  text?: string;
  repeat?: number;
  className?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  text = "START A PROJECT • AUTOMATE YOUR BUSINESS • AI + HUMAN INTELLIGENCE • BESPOKE ENGINEERING • ",
  repeat = 3,
  className = "",
}) => {
  return (
    <div className={`overflow-hidden select-none whitespace-nowrap flex ${className}`}>
      <motion.div
        className="flex whitespace-nowrap font-sans text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter text-white/10"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 26,
        }}
      >
        {Array.from({ length: repeat * 2 }).map((_, i) => (
          <span key={i} className="inline-block px-4 transition-colors hover:text-white/25 duration-300">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
