"use client";

import React, { useState } from "react";
import { MarqueeTicker } from "../common/MarqueeTicker";
import { MagneticWrapper } from "../common/MagneticWrapper";
import { TextMaskReveal } from "../common/TextMaskReveal";
import { Copy, Check, ArrowUpRight, Globe, Shield, Terminal } from "lucide-react";

interface ConversionFooterProps {
  onOpenInquiryDrawer: () => void;
}

export const ConversionFooter: React.FC<ConversionFooterProps> = ({
  onOpenInquiryDrawer,
}) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("contact@ixoriee.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="relative bg-[#141416] text-[#F4F4F6] pt-20 border-t border-white/10 overflow-hidden z-10">
      {/* Infinite Velocity Marquee */}
      <div className="py-6 border-b border-white/10">
        <MarqueeTicker />
      </div>

      {/* Conversion Hub */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#10B981] bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>ACCEPTING SELECT CLIENT COMMISSIONS FOR Q3/Q4 2026</span>
        </div>

        <TextMaskReveal>
          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-medium text-white max-w-3xl mx-auto leading-tight tracking-tight">
            Ready to transform your business into a high-performance digital engine?
          </h2>
        </TextMaskReveal>

        <p className="font-sans text-neutral-400 text-base md:text-lg max-w-xl mx-auto mt-6 mb-12 leading-relaxed">
          From manual operational bottlenecks to automated edge infrastructure and award-winning digital experiences.
        </p>

        {/* Action Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-xl">
          <MagneticWrapper onClick={onOpenInquiryDrawer}>
            <button className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-semibold text-base hover:scale-105 hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <span>Open Inquiry Drawer &amp; Book Call</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </MagneticWrapper>
        </div>

        {/* Copy Direct Endpoint Button */}
        <div className="mt-8">
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="text-[#10B981] font-semibold">
                  contact@ixoriee.com copied to clipboard!
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300" />
                <span>
                  Copy Direct Endpoint: <strong className="text-white">contact@ixoriee.com</strong>
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Metadata Bar */}
      <div className="border-t border-white/10 mt-16 py-8 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-neutral-400" />
          <span>© 2026 IXORIEE. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <Globe className="w-3.5 h-3.5 text-neutral-400" />
          <span>STUDIO BASED IN INDIA • SERVING CLIENTS GLOBALLY</span>
        </div>

        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#10B981]" />
          <span>TIMEZONE: ASIA/KOLKATA (IST) • 100% INDEPENDENT DIGITAL ARCHITECT</span>
        </div>
      </div>
    </footer>
  );
};
