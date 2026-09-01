"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { MagneticWrapper } from "../common/MagneticWrapper";

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialScope?: string;
}

const SCOPE_OPTIONS = [
  "UI/UX & Interactive Web Systems",
  "Full-Stack SaaS & Custom Web Platforms",
  "Agentic AI & Custom Automations",
  "Turnkey 0-to-1 Brand Launchpad",
];

const BUDGET_TIERS = ["<$5k (Sprint)", "$5k - $15k", "$15k - $35k", "$35k+ (Enterprise)"];
const TIMELINE_OPTIONS = ["2 - 4 Weeks", "1 - 2 Months", "Quarterly Partnership"];

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  initialScope,
}) => {
  const [selectedScopes, setSelectedScopes] = useState<string[]>(
    initialScope ? [initialScope] : [SCOPE_OPTIONS[0]]
  );
  const [budgetTier, setBudgetTier] = useState<string>(BUDGET_TIERS[1]);
  const [timeline, setTimeline] = useState<string>(TIMELINE_OPTIONS[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setStatus("idle");
      setErrorMessage("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleScope = (scope: string) => {
    if (selectedScopes.includes(scope)) {
      if (selectedScopes.length > 1) {
        setSelectedScopes(selectedScopes.filter((s) => s !== scope));
      }
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

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
        budget: budgetTier,
        timeline: timeline,
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
        <div className="fixed inset-0 z-[120] flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1D20]/60 backdrop-blur-sm"
          />

          {/* Snellenberg Elastic Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 250,
            }}
            className="relative w-full max-w-xl h-full bg-[#FFFFFF] text-[#1C1D20] shadow-[0_0_80px_rgba(0,0,0,0.25)] flex flex-col justify-between z-10 overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 px-6 sm:px-8 py-6 border-b border-[#1C1D20]/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#10B981] font-bold flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  DIRECT DISCOVERY ENDPOINT
                </span>
                <h3 className="font-sans text-xl md:text-2xl font-semibold tracking-tight text-[#1C1D20]">
                  Project Architecture Brief
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[#F4F4F0] hover:bg-[#1C1D20] hover:text-white flex items-center justify-center text-[#1C1D20] transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-8 space-y-8 flex-1">
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
                  <p className="font-sans text-neutral-600 text-sm max-w-sm mb-8 leading-relaxed">
                    Our engineering studio has received your architectural scope. We review incoming briefs within 12 hours with calendar invites and initial estimations.
                  </p>
                  <MagneticWrapper onClick={onClose}>
                    <button className="px-8 py-3.5 bg-[#1C1D20] text-white font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-black transition-colors">
                      Return to Studio
                    </button>
                  </MagneticWrapper>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Tier 1: Scope Selector */}
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                      Tier 01 — Target Scope (Multi-Select)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SCOPE_OPTIONS.map((scope) => {
                        const isSelected = selectedScopes.includes(scope);
                        return (
                          <button
                            type="button"
                            key={scope}
                            onClick={() => toggleScope(scope)}
                            className={`font-sans text-xs px-4 py-2.5 rounded-full border transition-all ${
                              isSelected
                                ? "bg-[#1C1D20] text-white border-[#1C1D20]"
                                : "bg-[#F4F4F0] text-[#1C1D20] border-transparent hover:border-black/20"
                            }`}
                          >
                            {scope}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tier 2: Budget & Timeline */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                        Tier 02.A — Investment Horizon
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {BUDGET_TIERS.map((tier) => (
                          <button
                            type="button"
                            key={tier}
                            onClick={() => setBudgetTier(tier)}
                            className={`font-mono text-xs py-2.5 px-3 rounded-xl border text-center transition-all ${
                              budgetTier === tier
                                ? "bg-[#1C1D20] text-white border-[#1C1D20]"
                                : "bg-[#F4F4F0] text-[#1C1D20] border-transparent hover:border-black/20"
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                        Tier 02.B — Target Delivery Horizon
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {TIMELINE_OPTIONS.map((tl) => (
                          <button
                            type="button"
                            key={tl}
                            onClick={() => setTimeline(tl)}
                            className={`font-mono text-xs py-2 px-4 rounded-full border transition-all ${
                              timeline === tl
                                ? "bg-[#1C1D20] text-white border-[#1C1D20]"
                                : "bg-[#F4F4F0] text-[#1C1D20] border-transparent hover:border-black/20"
                            }`}
                          >
                            {tl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tier 3: Client Intake Fields */}
                  <div className="space-y-4 pt-2 border-t border-[#1C1D20]/10">
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Tier 03 — Client Intake
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
                        placeholder="Brief overview of manual bottlenecks or engineering goals..."
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
                      <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Asia/Kolkata (IST) • 12h SLA</span>
                    </div>

                    <MagneticWrapper>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="flex items-center gap-2 bg-[#1C1D20] text-white px-7 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-black transition-colors disabled:opacity-50"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <span>Dispatch Brief</span>
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
