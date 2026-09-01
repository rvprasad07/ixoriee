"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Lock,
  Unlock,
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  Eye,
  EyeOff,
  Mail,
  Building,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Database,
  Layers,
  LogOut,
  Sliders,
} from "lucide-react";

interface InquiryRecord {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company?: string;
  project_type: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: "new" | "in_review" | "contacted" | "archived";
  notes?: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [showPin, setShowPin] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Dashboard Data State
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState<string>("");
  const [isSavingNote, setIsSavingNote] = useState<boolean>(false);

  // Check saved session in browser
  useEffect(() => {
    const session = localStorage.getItem("ixoriee_admin_session");
    if (session === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch inquiries from API
  const fetchInquiries = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated, fetchInquiries]);

  // Handle PIN verification
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;

    setIsVerifying(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.authenticated) {
        localStorage.setItem("ixoriee_admin_session", "authenticated");
        setIsAuthenticated(true);
      } else {
        setAuthError(data.error || "Incorrect Admin PIN");
      }
    } catch {
      setAuthError("Authentication server error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ixoriee_admin_session");
    setIsAuthenticated(false);
    setPinInput("");
  };

  // Update lead status in Supabase
  const handleStatusChange = async (id: string, newStatus: InquiryRecord["status"]) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Save internal admin notes
  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setIsSavingNote(true);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedInquiry.id, notes: adminNoteInput }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === selectedInquiry.id ? { ...item, notes: adminNoteInput } : item
          )
        );
        setSelectedInquiry((prev) => (prev ? { ...prev, notes: adminNoteInput } : null));
      }
    } catch (err) {
      console.error("Failed to save notes:", err);
    } finally {
      setIsSavingNote(false);
    }
  };

  // Delete lead
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this client inquiry?")) return;

    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  // Filtered inquiries list
  const filteredInquiries = inquiries.filter((item) => {
    const matchesTab = activeTab === "all" ? true : item.status === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.company && item.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.project_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Calculate Metrics
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "new").length;
  const inReviewCount = inquiries.filter((i) => i.status === "in_review").length;
  const contactedCount = inquiries.filter((i) => i.status === "contacted").length;

  // =========================================================================
  // VIEW 1: PIN ENTRY GATEKEEPER
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#141416] text-[#F4F4F0] flex flex-col justify-center items-center px-4 select-none relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2E62FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#1C1D20] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto text-white shadow-inner">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest pt-1">
              SECURITY LEVEL // RESTRICTED
            </div>
            <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ixoriee Studio Control
            </h1>
            <p className="font-sans text-xs text-neutral-400">
              Enter your master secret PIN to inspect incoming client architecture briefs and pipeline telemetry.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                placeholder="Enter Master PIN (e.g. ixoriee2026)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                className="w-full bg-white/5 border border-white/15 focus:border-emerald-400 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 font-mono tracking-wider focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-white text-black py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
              {isVerifying ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Access Admin Hub</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-white/10 text-center font-mono text-[10px] text-neutral-500">
            DATABASE: SUPABASE POSTGRESQL • 0-AUTH CUSTOMER PIPELINE
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <main className="min-h-screen bg-[#141416] text-[#F4F4F0] p-4 sm:p-8 font-sans select-text">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top App Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                LIVE SUPABASE SYNC
              </span>
              <span className="text-neutral-500 text-xs font-mono">•</span>
              <span className="font-mono text-xs text-neutral-400">ASIA/KOLKATA (IST)</span>
            </div>
            <h1 className="font-sans text-3xl font-bold tracking-tight text-white mt-1">
              Ixoriee Studio Control Hub
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchInquiries}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh Leads</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-xs font-mono text-red-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </header>

        {/* Lead Analytics KPI Metric Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1C1D20] border border-white/10 p-5 rounded-2xl shadow-sm space-y-2">
            <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider block">
              Total Inquiries
            </span>
            <div className="font-sans text-3xl font-bold text-white">{totalCount}</div>
            <p className="font-mono text-[10px] text-neutral-500">All-time customer briefs</p>
          </div>

          <div className="bg-[#1C1D20] border border-white/10 p-5 rounded-2xl shadow-sm space-y-2">
            <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider block font-bold">
              New Leads
            </span>
            <div className="font-sans text-3xl font-bold text-emerald-400">{newCount}</div>
            <p className="font-mono text-[10px] text-neutral-500">Requires 12h SLA response</p>
          </div>

          <div className="bg-[#1C1D20] border border-white/10 p-5 rounded-2xl shadow-sm space-y-2">
            <span className="font-mono text-[11px] text-amber-400 uppercase tracking-wider block font-bold">
              In Review / Scoping
            </span>
            <div className="font-sans text-3xl font-bold text-amber-400">{inReviewCount}</div>
            <p className="font-mono text-[10px] text-neutral-500">Active architecture evaluation</p>
          </div>

          <div className="bg-[#1C1D20] border border-white/10 p-5 rounded-2xl shadow-sm space-y-2">
            <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider block font-bold">
              Contacted / Closed
            </span>
            <div className="font-sans text-3xl font-bold text-cyan-400">{contactedCount}</div>
            <p className="font-mono text-[10px] text-neutral-500">Commission proposals sent</p>
          </div>
        </section>

        {/* Filter Tabs & Search Controls */}
        <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === "all" ? "bg-white text-black font-bold shadow" : "text-neutral-400 hover:text-white"
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "new"
                  ? "bg-emerald-400 text-black font-bold shadow"
                  : "text-neutral-400 hover:text-emerald-400"
              }`}
            >
              {newCount > 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              New ({newCount})
            </button>
            <button
              onClick={() => setActiveTab("in_review")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === "in_review"
                  ? "bg-amber-400 text-black font-bold shadow"
                  : "text-neutral-400 hover:text-amber-400"
              }`}
            >
              In Review ({inReviewCount})
            </button>
            <button
              onClick={() => setActiveTab("contacted")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === "contacted"
                  ? "bg-cyan-400 text-black font-bold shadow"
                  : "text-neutral-400 hover:text-cyan-400"
              }`}
            >
              Contacted ({contactedCount})
            </button>
            <button
              onClick={() => setActiveTab("archived")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === "archived" ? "bg-white/20 text-white font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              Archived
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search leads by name, email, scope..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
          </div>
        </section>

        {/* Inquiries Data Table */}
        <section className="bg-[#1C1D20] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          {isLoading ? (
            <div className="py-24 text-center space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-neutral-400" />
              <p className="font-mono text-xs text-neutral-400">Loading live inquiries from Supabase...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="py-24 text-center space-y-3">
              <Database className="w-10 h-10 mx-auto text-neutral-600" />
              <h3 className="font-sans text-lg font-bold text-neutral-300">No client briefs found</h3>
              <p className="font-sans text-xs text-neutral-500 max-w-sm mx-auto">
                {searchTerm
                  ? "No results matched your search query."
                  : "Client inquiries submitted on the homepage will automatically stream into this database table."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                  <tr>
                    <th className="py-4 px-6">Client / Contact</th>
                    <th className="py-4 px-6">Project Scope</th>
                    <th className="py-4 px-6">Budget &amp; Timeline</th>
                    <th className="py-4 px-6">Date (IST)</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredInquiries.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setSelectedInquiry(item);
                        setAdminNoteInput(item.notes || "");
                      }}
                      className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                    >
                      {/* Client info */}
                      <td className="py-4 px-6">
                        <div className="font-sans font-bold text-white text-sm">{item.name}</div>
                        <div className="font-mono text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-neutral-500" />
                          <span>{item.email}</span>
                        </div>
                        {item.company && (
                          <div className="font-mono text-[10px] text-neutral-500 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-neutral-600" />
                            <span>{item.company}</span>
                          </div>
                        )}
                      </td>

                      {/* Scope */}
                      <td className="py-4 px-6">
                        <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 inline-block">
                          {item.project_type}
                        </span>
                      </td>

                      {/* Budget */}
                      <td className="py-4 px-6 font-mono text-[11px]">
                        <div className="text-white font-semibold">{item.budget || "Unspecified"}</div>
                        <div className="text-neutral-500 text-[10px]">{item.timeline || "Flexible"}</div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 font-mono text-[11px] text-neutral-400">
                        {new Date(item.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Status Selector */}
                      <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value as InquiryRecord["status"])
                          }
                          className={`font-mono text-[11px] px-3 py-1.5 rounded-xl border font-bold focus:outline-none transition-colors cursor-pointer ${
                            item.status === "new"
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                              : item.status === "in_review"
                              ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                              : item.status === "contacted"
                              ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                              : "bg-white/10 text-neutral-400 border-white/10"
                          }`}
                        >
                          <option value="new" className="bg-[#1C1D20] text-emerald-400">
                            ● New
                          </option>
                          <option value="in_review" className="bg-[#1C1D20] text-amber-400">
                            ● In Review
                          </option>
                          <option value="contacted" className="bg-[#1C1D20] text-cyan-400">
                            ● Contacted
                          </option>
                          <option value="archived" className="bg-[#1C1D20] text-neutral-400">
                            ● Archived
                          </option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedInquiry(item);
                              setAdminNoteInput(item.notes || "");
                            }}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors"
                            title="Inspect Details"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(item.id)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Lead Detail Modal */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-[#1C1D20] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    CLIENT BRIEF INSPECTION // ID: {selectedInquiry.id.slice(0, 8)}
                  </span>
                  <h2 className="font-sans text-2xl font-bold text-white">{selectedInquiry.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase">Email</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="font-mono text-xs text-cyan-400 hover:underline block truncate"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase">Company</span>
                  <div className="font-sans text-xs font-semibold text-white truncate">
                    {selectedInquiry.company || "Direct Individual"}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase">Budget Tier</span>
                  <div className="font-mono text-xs font-bold text-emerald-400">
                    {selectedInquiry.budget || "Unspecified"}
                  </div>
                </div>
              </div>

              {/* Project Scope */}
              <div>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block mb-2 font-bold">
                  Commissioned Scope
                </span>
                <span className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white">
                  {selectedInquiry.project_type}
                </span>
              </div>

              {/* Message */}
              <div>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block mb-2 font-bold">
                  Project Overview &amp; Bottlenecks
                </span>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 font-sans text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block font-bold">
                  Internal Studio Notes (Private)
                </span>
                <textarea
                  rows={3}
                  placeholder="Add private estimations, call notes, or milestone comments..."
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-emerald-400 rounded-xl p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors resize-none"
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={isSavingNote}
                  className="bg-white/15 hover:bg-white hover:text-black text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors font-mono"
                >
                  {isSavingNote ? "Saving Notes..." : "Save Internal Notes"}
                </button>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=IXORIEE%20—%20Discovery%20Brief%20Follow-up`}
                  className="flex items-center gap-2 bg-emerald-400 text-black px-6 py-2.5 rounded-full font-bold text-xs hover:bg-emerald-300 transition-colors font-mono"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email</span>
                </a>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-xs font-mono text-neutral-400 hover:text-white"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Future Visual CMS Notice */}
        <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-neutral-400" />
            <span>EXTENSIBLE ARCHITECTURE: NO-CODE VISUAL CMS READY FOR DEPLOYMENT WHEN REQUESTED.</span>
          </div>
          <span>STUDIO OS // v1.8</span>
        </section>
      </div>
    </main>
  );
}
