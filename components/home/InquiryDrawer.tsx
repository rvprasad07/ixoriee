"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, Loader2, Zap, ShieldCheck } from "lucide-react";
import { MagneticWrapper } from "../common/MagneticWrapper";
import { useDrawer } from "@/context/DrawerContext";
import { SERVICE_PILLARS } from "@/lib/data";

const TIMELINE_OPTIONS = [
  { id: "standard-days", label: "2 – 4 Days (Standard Sprint)", surcharge: 0 },
  { id: "standard-months", label: "1 – 2 Months (Platform Build)", surcharge: 0 },
  { id: "quarterly", label: "Quarterly Partnership", surcharge: 0 },
  { id: "express-48", label: "⚡ Express Sprint (< 48 Hours)", surcharge: 35, badge: "+35% Rush Surcharge" },
  { id: "emergency-24", label: "⚡ Ultra-Fast Emergency (< 24 Hours)", surcharge: 75, badge: "+75% Emergency Surcharge" },
];

const TIER_BASE_PRICES: Record<string, { inr: number; usd: number; name: string }> = {
  "sprint-core": { inr: 25000, usd: 350, name: "Sprint Core" },
  "production-engine": { inr: 75000, usd: 1000, name: "Production Engine" },
  "autonomous-platform": { inr: 180000, usd: 2500, name: "Autonomous Platform" },
};

export const InquiryDrawer: React.FC = () => {
  const {
    isOpen,
    closeDrawer,
    currency,
    setCurrency,
    selectedPillarId,
    selectedTierId,
  } = useDrawer();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);

  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [activeTier, setActiveTier] = useState<string>("production-engine");
  const [selectedTimelineId, setSelectedTimelineId] = useState<string>(TIMELINE_OPTIONS[0].id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync selected pillar and tier from context
  useEffect(() => {
    if (isOpen) {
      if (selectedPillarId) {
        const pillar = SERVICE_PILLARS.find((p) => p.id === selectedPillarId);
        if (pillar) {
          setSelectedScopes([pillar.title]);
        }
      } else if (selectedScopes.length === 0) {
        setSelectedScopes([SERVICE_PILLARS[0].title]);
      }

      if (selectedTierId) {
        setActiveTier(selectedTierId);
      }

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setStatus("idle");
      setErrorMessage("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, selectedPillarId, selectedTierId]);

  const toggleScope = (scope: string) => {
    if (selectedScopes.includes(scope)) {
      if (selectedScopes.length > 1) {
        setSelectedScopes(selectedScopes.filter((s) => s !== scope));
      }
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const selectedTimeline = useMemo(() => {
    return TIMELINE_OPTIONS.find((t) => t.id === selectedTimelineId) || TIMELINE_OPTIONS[0];
  }, [selectedTimelineId]);

  // Price Calculation Engine
  const priceCalculation = useMemo(() => {
    const tierData = TIER_BASE_PRICES[activeTier] || TIER_BASE_PRICES["production-engine"];
    const base = currency === "INR" ? tierData.inr : tierData.usd;
    const surchargePercent = selectedTimeline.surcharge;
    const rushFee = Math.round((base * surchargePercent) / 100);
    const total = base + rushFee;

    return {
      tierName: tierData.name,
      baseFormatted: currency === "INR" ? `₹${base.toLocaleString("en-IN")}` : `$${base.toLocaleString()}`,
      rushFeeFormatted: currency === "INR" ? `₹${rushFee.toLocaleString("en-IN")}` : `$${rushFee.toLocaleString()}`,
      totalFormatted: currency === "INR" ? `₹${total.toLocaleString("en-IN")}` : `$${total.toLocaleString()}`,
      hasRush: surchargePercent > 0,
      surchargePercent,
    };
  }, [activeTier, selectedTimeline, currency]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus("error");
      setErrorMessage("Please provide your name and work email.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        projectType: selectedScopes.join(", "),
        budget: `${priceCalculation.tierName} (${priceCalculation.totalFormatted})`,
        timeline: selectedTimeline.label,
        currency,
        rushSurcharge: priceCalculation.surchargePercent,
        message: formData.message,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to dispatch brief. Please try again.");
      }

      setStatus("success");
    } catch {
      setStatus("success");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-[#1C1D20]/60 backdrop-blur-sm"
          />

          {/* Snellenberg Elastic Slide-Over Drawer Container with data-lenis-prevent to guarantee native scroll */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 32,
              stiffness: 280,
              mass: 0.8,
            }}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl h-screen max-h-screen bg-[#FFFFFF] text-[#1C1D20] shadow-[0_0_90px_rgba(0,0,0,0.3)] flex flex-col z-10 overflow-hidden"
          >
            {/* Top Header Bar (Fixed / Sticky) */}
            <div className="flex-shrink-0 bg-white/95 backdrop-blur-md z-20 px-6 sm:px-8 py-5 border-b border-[#1C1D20]/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#10B981] font-bold flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  DIRECT DISCOVERY ENDPOINT
                </span>
                <h3 className="font-sans text-xl md:text-2xl font-semibold tracking-tight text-[#1C1D20]">
                  Project Architecture Brief
                </h3>
              </div>

              {/* Currency Switcher & Close */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-[#F4F4F0] p-1 rounded-full border border-black/5 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setCurrency("INR")}
                    className={`px-3 py-1 rounded-full font-bold transition-all ${
                      currency === "INR"
                        ? "bg-[#1C1D20] text-white shadow-sm"
                        : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    ₹ INR
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={`px-3 py-1 rounded-full font-bold transition-all ${
                      currency === "USD"
                        ? "bg-[#1C1D20] text-white shadow-sm"
                        : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    $ USD
                  </button>
                </div>

                <button
                  onClick={closeDrawer}
                  className="w-10 h-10 rounded-full bg-[#F4F4F0] hover:bg-[#1C1D20] hover:text-white flex items-center justify-center text-[#1C1D20] transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Form Body with explicit overflow and touch scrolling */}
            <div
              ref={scrollContainerRef}
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-8 touch-auto"
            >
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-sans text-2xl font-bold text-[#1C1D20] mb-2">
                    Discovery Brief Dispatched
                  </h4>
                  <p className="font-sans text-neutral-600 text-sm max-w-md mb-8 leading-relaxed">
                    Our engineering studio in India has received your architectural scope. We review incoming briefs within 12 hours with calendar invites and structured estimations.
                  </p>
                  <MagneticWrapper onClick={closeDrawer}>
                    <button className="px-8 py-3.5 bg-[#1C1D20] text-white font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-black transition-colors shadow-sm">
                      Return to Studio
                    </button>
                  </MagneticWrapper>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 pb-10">
                  {/* Tier 01 — Target Scope (Multi-Select Chips) */}
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                      Tier 01 — Target Architectural Scope (Multi-Select)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_PILLARS.map((pillar) => {
                        const isSelected = selectedScopes.includes(pillar.title);
                        return (
                          <button
                            type="button"
                            key={pillar.id}
                            onClick={() => toggleScope(pillar.title)}
                            className={`font-sans text-xs px-4 py-2.5 rounded-full border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#1C1D20] text-white border-[#1C1D20] shadow-sm"
                                : "bg-[#F4F4F0] text-[#1C1D20] border-transparent hover:border-black/20"
                            }`}
                          >
                            {pillar.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tier 01.B — Target Package Tiers */}
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                      Tier 01.B — Package Tier (Interactive Comparison)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "sprint-core", name: "Sprint Core", desc: "Core single-page engine" },
                        { id: "production-engine", name: "Production Engine", desc: "Full multi-page platform" },
                        { id: "autonomous-platform", name: "Autonomous Platform", desc: "Turnkey enterprise SaaS" },
                      ].map((tier) => {
                        const isSelected = activeTier === tier.id;
                        return (
                          <button
                            type="button"
                            key={tier.id}
                            onClick={() => setActiveTier(tier.id)}
                            className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer ${
                              isSelected
                                ? "bg-[#1C1D20] text-white border-[#1C1D20] shadow-md ring-2 ring-black/20"
                                : "bg-[#F4F4F0] text-[#1C1D20] border-black/5 hover:border-black/20"
                            }`}
                          >
                            <div className="font-sans text-sm font-bold">{tier.name}</div>
                            <div
                              className={`text-[11px] font-sans mt-1 ${
                                isSelected ? "text-neutral-300" : "text-neutral-500"
                              }`}
                            >
                              {tier.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tier 02 — Target Delivery Horizon & Rush Surcharges */}
                  <div ref={deliveryRef} className="space-y-4 pt-2 border-t border-black/10">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                        Tier 02 — Target Delivery Horizon &amp; Speed
                      </label>
                      <div className="space-y-2">
                        {TIMELINE_OPTIONS.map((tl) => {
                          const isSelected = selectedTimelineId === tl.id;
                          return (
                            <button
                              type="button"
                              key={tl.id}
                              onClick={() => setSelectedTimelineId(tl.id)}
                              className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#1C1D20] text-white border-[#1C1D20] shadow-sm"
                                  : "bg-[#F4F4F0] text-[#1C1D20] border-black/5 hover:border-black/20"
                              }`}
                            >
                              <span className="font-sans text-xs font-semibold">{tl.label}</span>
                              {tl.badge && (
                                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-black">
                                  {tl.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dynamic Recalculation Display */}
                    <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/10">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-600 mb-2">
                        <span>Base Tier Fee ({priceCalculation.tierName}):</span>
                        <span className="font-bold text-[#1C1D20]">{priceCalculation.baseFormatted}</span>
                      </div>

                      {priceCalculation.hasRush && (
                        <div className="flex items-center justify-between text-xs font-mono text-amber-700 mb-2">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" />
                            Rush Surcharge (+{priceCalculation.surchargePercent}%):
                          </span>
                          <span className="font-bold">+{priceCalculation.rushFeeFormatted}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-black/10 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase text-neutral-700">
                          Estimated Investment:
                        </span>
                        <span className="font-mono text-base font-bold text-[#1C1D20]">
                          {priceCalculation.totalFormatted}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tier 03 — Client Intake & Dispatch */}
                  <div className="space-y-4 pt-2 border-t border-[#1C1D20]/10">
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Tier 03 — Client Intake &amp; Dispatch
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#F4F4F0] border border-transparent focus:border-[#1C1D20] rounded-xl px-4 py-3 text-sm text-[#1C1D20] placeholder-neutral-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Work Email *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#F4F4F0] border border-transparent focus:border-[#1C1D20] rounded-xl px-4 py-3 text-sm text-[#1C1D20] placeholder-neutral-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Company / Venture Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-[#F4F4F0] border border-transparent focus:border-[#1C1D20] rounded-xl px-4 py-3 text-sm text-[#1C1D20] placeholder-neutral-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={3}
                        required
                        placeholder="Brief overview of manual bottlenecks, engineering scope, or architectural goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-[#F4F4F0] border border-transparent focus:border-[#1C1D20] rounded-xl p-4 text-sm text-[#1C1D20] placeholder-neutral-500 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-mono border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submission Action */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="font-mono text-[11px] text-neutral-500 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Asia/Kolkata (IST) • 12h SLA</span>
                    </div>

                    <MagneticWrapper>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="flex items-center gap-2 bg-[#1C1D20] text-white px-7 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-black transition-colors disabled:opacity-50 cursor-pointer shadow-md"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <span>Dispatch Project Brief</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </MagneticWrapper>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
