"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialService = "Full-Stack SaaS & Studio Automation",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: initialService,
    timeline: "2-4 Weeks",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send inquiry. Please try again.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#08080A]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0E0E12] border border-white/15 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden z-10"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-glow/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
                    DIRECT DISCOVERY ENDPOINT
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                  Initiate System Architecture
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-display text-2xl font-bold text-white mb-2">
                  Discovery Brief Received
                </h4>
                <p className="font-sans text-neutral-400 text-sm max-w-md mb-8">
                  Our architecture team will review your requirements and respond within 12 hours with scope estimation and direct calendar links.
                </p>
                <MagneticButton onClick={onClose}>
                  <button className="px-8 py-3 bg-white text-black font-semibold text-sm rounded-full hover:bg-neutral-200 transition-colors">
                    Close Terminal
                  </button>
                </MagneticButton>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#15151B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent-cyan/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Direct Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#15151B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent-cyan/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CoreStudio Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#15151B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent-cyan/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Target Discipline
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#15151B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/60 transition-colors"
                    >
                      <option value="UI/UX & Interactive Web Systems">Pillar 01: UI/UX & Interactive Web Systems</option>
                      <option value="Full-Stack SaaS & Custom Web Platforms">Pillar 02: Full-Stack SaaS & Custom Platforms</option>
                      <option value="Agentic AI & Custom Automations">Pillar 03: Agentic AI & Custom Automations</option>
                      <option value="Turnkey 0-to-1 Brand Launchpad">Pillar 04: Turnkey 0-to-1 Brand Launchpad</option>
                      <option value="Enterprise Architecture & Consulting">Enterprise Architecture & Consulting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                    Project Requirements / Bottlenecks *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your current manual friction points, desired features, or launch milestones..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#15151B] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent-cyan/60 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>IST Timezone • Responses within 12h</span>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Brief</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
