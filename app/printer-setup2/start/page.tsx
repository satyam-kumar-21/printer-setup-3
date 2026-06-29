"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ChatUnavailableModal from "../components/ChatUnavailableModal";

const PRINTERS = [
  { name: "DeskJet 2700 Series",     type: "All-in-One",  icon: "🖨️", spec: "Wi-Fi & USB",       color: "from-sky-50 to-blue-50" },
  { name: "DeskJet 4100 Series",     type: "All-in-One",  icon: "🖨️", spec: "Wi-Fi & USB",       color: "from-sky-50 to-blue-50" },
  { name: "ENVY 6000 Series",        type: "Photo Smart", icon: "📸", spec: "Wi-Fi & Bluetooth", color: "from-violet-50 to-purple-50" },
  { name: "ENVY 6400 Series",        type: "Photo Smart", icon: "📸", spec: "Wi-Fi & Bluetooth", color: "from-violet-50 to-purple-50" },
  { name: "OfficeJet 8000 Series",   type: "Office Pro",  icon: "💼", spec: "Ethernet & Wi-Fi",  color: "from-slate-50 to-zinc-50" },
  { name: "OfficeJet Pro 9050",      type: "Office Pro",  icon: "💼", spec: "Ethernet & Wi-Fi",  color: "from-slate-50 to-zinc-50" },
  { name: "LaserJet Pro MFP",        type: "Laser Jet",   icon: "⚡", spec: "USB Connection",    color: "from-amber-50 to-yellow-50" },
  { name: "Smart Tank 5100 Series",  type: "Ink Tank",    icon: "🔋", spec: "Wi-Fi & USB",       color: "from-teal-50 to-cyan-50" },
  { name: "DeskJet Plus 4100",       type: "All-in-One",  icon: "🖨️", spec: "Wi-Fi & USB",       color: "from-sky-50 to-blue-50" },
  { name: "ENVY Photo 7100",         type: "Photo Smart", icon: "📸", spec: "Wi-Fi & Bluetooth", color: "from-violet-50 to-purple-50" },
  { name: "OfficeJet 5200",          type: "Office Pro",  icon: "💼", spec: "Wi-Fi & USB",       color: "from-slate-50 to-zinc-50" },
  { name: "LaserJet Enterprise",     type: "Enterprise",  icon: "⚡", spec: "Ethernet & USB",    color: "from-amber-50 to-yellow-50" },
];

const TYPE_COLORS: Record<string, string> = {
  "All-in-One":  "bg-sky-100 text-sky-700 border-sky-200",
  "Photo Smart": "bg-violet-100 text-violet-700 border-violet-200",
  "Office Pro":  "bg-slate-100 text-slate-600 border-slate-200",
  "Laser Jet":   "bg-amber-100 text-amber-700 border-amber-200",
  "Ink Tank":    "bg-teal-100 text-teal-700 border-teal-200",
  "Enterprise":  "bg-orange-100 text-orange-700 border-orange-200",
};

const STAGES = [
  { label: "Checking drivers",    pct: 0  },
  { label: "Downloading firmware", pct: 30 },
  { label: "Installing drivers",  pct: 65 },
  { label: "Finalising",         pct: 85 },
];

export default function StartSetup() {
  const [step,            setStep]            = useState(1);
  const [printerModel,    setPrinterModel]    = useState("");
  const [searchQuery,     setSearchQuery]     = useState("");
  const [installProgress, setInstallProgress] = useState(0);
  const [showError,       setShowError]       = useState(false);
  const [installStage,    setInstallStage]    = useState(0);
  const [chatOpen,        setChatOpen]        = useState(false);

  const filtered = searchQuery
    ? PRINTERS.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : PRINTERS;

  const startInstall = () => {
    setStep(3);
    setInstallProgress(0);
    setInstallStage(0);
    setShowError(false);

    let progress = 0;
    let stage = 0;

    const iv = setInterval(() => {
      progress += Math.random() * 5 + 1;

      // Advance stage labels
      if (progress >= 30 && stage === 0) { stage = 1; setInstallStage(1); }
      if (progress >= 55 && stage === 1) { stage = 2; setInstallStage(2); }
      if (progress >= 78 && stage === 2) { stage = 3; setInstallStage(3); }

      const capped = Math.min(progress, 72);
      setInstallProgress(capped);

      if (progress >= 72) {
        clearInterval(iv);
        setTimeout(() => setShowError(true), 900);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-sky-50/40 to-blue-50/30 selection:bg-sky-100">

      {/* ── Top Bar ── */}
      <header className="shrink-0 h-16 px-6 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-white/60 shadow-sm sticky top-0 z-50">
        <Link href="/printer-setup2" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </div>
          <span className="font-black text-slate-900 tracking-tight text-base">PrintAssist</span>
        </Link>

        <div className="flex items-center gap-3">
          <a href="tel:+18556184642" className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            +1 (855) 618-4642
          </a>
          <button onClick={() => setChatOpen(true)} className="text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 bg-white px-4 py-2 rounded-full hover:bg-slate-50 transition-all shadow-sm">
            Live Support
          </button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-2xl">

          {/* ══ STEP 1 — Choose Printer ══ */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>

              {/* Progress header */}
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10px] font-black tracking-[0.15em] uppercase text-slate-400">Step 1 of 2</span>
                <span className="text-[10px] font-bold text-sky-600">Choose Printer</span>
              </div>
              <div className="w-full h-1 bg-slate-200 rounded-full mb-8 overflow-hidden">
                <div className="w-1/2 h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" />
              </div>

              {/* Card */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-2xl shadow-sky-900/8 p-8">
                <div className="mb-6 space-y-1">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Choose Your Printer</h1>
                  <p className="text-slate-500 text-sm">Search for your model, then tap to select it.</p>
                </div>

                {/* Search bar */}
                <div className="relative mb-5">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search e.g. DeskJet 2700, ENVY 6000…"
                    className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100 transition-all"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-4 flex items-center">
                      <span className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 flex items-center justify-center text-xs font-bold transition-colors">×</span>
                    </button>
                  )}
                </div>

                {/* Printer rows */}
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1 -mr-1">
                  <AnimatePresence>
                    {filtered.map((p, i) => {
                      const sel = printerModel === p.name;
                      return (
                        <motion.button
                          key={p.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.025 }}
                          onClick={() => setPrinterModel(p.name)}
                          className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border text-left transition-all duration-200 group
                            ${sel
                              ? "border-sky-400 bg-gradient-to-r from-sky-50 to-blue-50 shadow-md shadow-sky-200/40"
                              : "border-slate-150 bg-white hover:border-sky-200 hover:bg-sky-50/30 hover:shadow-sm"
                            }`}
                        >
                          {/* Status dot */}
                          <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${sel ? "bg-sky-500" : "bg-slate-300 group-hover:bg-sky-300"}`} />

                          {/* Icon */}
                          <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{p.icon}</span>

                          {/* Name + badge */}
                          <div className="flex-1 min-w-0">
                            <span className={`block text-sm font-bold truncate ${sel ? "text-sky-700" : "text-slate-800"}`}>{p.name}</span>
                            <span className={`inline-block mt-0.5 text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${TYPE_COLORS[p.type] ?? "bg-slate-100 text-slate-500 border-slate-200"}`}>
                              {p.type}
                            </span>
                          </div>

                          {/* Spec */}
                          <span className="hidden sm:block text-[10px] font-semibold text-slate-400 shrink-0">{p.spec}</span>

                          {/* Radio circle */}
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${sel ? "border-sky-500 bg-sky-500" : "border-slate-300 group-hover:border-sky-300"}`}>
                            {sel && (
                              <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                              </motion.svg>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>

                  {filtered.length === 0 && (
                    <div className="py-10 text-center text-slate-400 text-sm font-semibold">No printers matched your search.</div>
                  )}
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
                  <Link href="/printer-setup2" className="text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors px-2">
                    ← Back
                  </Link>
                  <button
                    disabled={!printerModel}
                    onClick={() => setStep(2)}
                    className={`flex items-center gap-2 px-7 py-3 font-bold rounded-2xl text-sm transition-all duration-200
                      ${printerModel
                        ? "bg-sky-600 hover:bg-sky-700 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 hover:-translate-y-0.5"
                        : "bg-slate-100 text-slate-350 cursor-not-allowed"
                      }`}
                  >
                    Next
                    {printerModel && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══ STEP 2 — Confirm ══ */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10px] font-black tracking-[0.15em] uppercase text-slate-400">Step 2 of 2</span>
                <span className="text-[10px] font-bold text-sky-600">Start Setup</span>
              </div>
              <div className="w-full h-1 bg-slate-200 rounded-full mb-8 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" />
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-2xl shadow-sky-900/8 p-8 text-center space-y-8">
                {/* Animated printer icon */}
                <div className="flex justify-center">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full bg-sky-100 animate-ping opacity-30" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-xl shadow-sky-500/30">
                      <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900">Ready to Start</h2>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto">
                    We will now install the drivers for your <span className="font-bold text-sky-600">{printerModel}</span>. This takes about a minute.
                  </p>
                </div>

                {/* Primer info chips */}
                <div className="flex flex-wrap justify-center gap-2">
                  {["Driver Download", "Firmware Check", "Port Configuration", "Test Page"].map(s => (
                    <span key={s} className="px-3 py-1.5 bg-sky-50 border border-sky-100 text-sky-700 text-[10px] font-bold rounded-full">{s}</span>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(1)} className="flex-1 py-3.5 border border-slate-200 bg-white text-slate-600 font-bold rounded-2xl text-sm hover:bg-slate-50 transition-colors">
                    Back
                  </button>
                  <button
                    onClick={startInstall}
                    className="flex-1 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl text-sm shadow-lg shadow-sky-500/20 hover:-translate-y-0.5 transition-all"
                  >
                    Start Setup
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══ STEP 3 — Installing / Error ══ */}
          {step === 3 && (
            <AnimatePresence mode="wait">

              {/* Loading state */}
              {!showError && (
                <motion.div key="loading" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-2xl shadow-sky-900/8 p-10 text-center space-y-8">

                    {/* Animated rings */}
                    <div className="flex justify-center">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 rounded-full border-4 border-sky-100" />
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-500 animate-spin" />
                        <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-blue-400 animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h2 className="text-2xl font-black text-slate-900">Setting Up Your Printer</h2>
                      <p className="text-slate-500 text-sm font-medium">{printerModel}</p>
                    </div>

                    {/* Stage steps */}
                    <div className="grid grid-cols-4 gap-2">
                      {STAGES.map((s, i) => (
                        <div key={i} className="space-y-2 text-center">
                          <div className={`w-full h-1.5 rounded-full transition-all duration-500 ${installStage > i ? "bg-sky-500" : installStage === i ? "bg-sky-300 animate-pulse" : "bg-slate-100"}`} />
                          <span className={`text-[9px] font-bold uppercase tracking-wider block ${installStage >= i ? "text-sky-600" : "text-slate-300"}`}>
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Big progress bar */}
                    <div className="space-y-3">
                      <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500"
                          style={{ width: `${installProgress}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                        {/* Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Progress</span>
                        <span className="text-sm font-black text-sky-600">{Math.floor(installProgress)}%</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 font-medium">Please keep this page open…</p>
                  </div>
                </motion.div>
              )}

              {/* Error state */}
              {showError && (
                <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, type: "spring", stiffness: 200 }}>
                  <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-2xl shadow-sky-900/8 overflow-hidden">

                    {/* Red banner */}
                    <div className="bg-gradient-to-r from-red-500 to-rose-600 px-8 py-6 flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-white">Connection Error</h2>
                        <p className="text-red-100 text-sm font-medium mt-0.5">Error 1603 — Printer driver could not be installed</p>
                      </div>
                    </div>

                    <div className="p-8 space-y-8">

                      {/* Two-col: left text + right helpline */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-slate-100">
                          <h3 className="font-black text-slate-900 text-base">What happened?</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">The driver installation failed. This usually happens due to a firewall block or an outdated OS. Our support team can fix it in minutes.</p>
                        </div>

                        <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-center space-y-3 shadow-lg shadow-sky-500/20">
                          <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Toll-Free Helpline</span>
                          </div>
                          <p className="text-2xl font-black text-white tracking-wide leading-tight">+1 (855) 618-4642</p>
                          <p className="text-sky-100 text-[10px] font-semibold">Available 24 / 7</p>
                          <a href="tel:+18556184642" className="block">
                            <button className="w-full py-2.5 bg-white hover:bg-sky-50 text-sky-700 font-black rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-sm">
                              📞 Call Now
                            </button>
                          </a>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={() => setChatOpen(true)}
                          className="flex items-center justify-center gap-2.5 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-sm transition-all hover:-translate-y-0.5 shadow-md"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Chat with Support
                        </button>
                        <button
                          onClick={() => { setStep(1); setShowError(false); setInstallProgress(0); setInstallStage(0); }}
                          className="flex items-center justify-center gap-2.5 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition-all hover:-translate-y-0.5 shadow-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Try Again
                        </button>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="shrink-0 py-5 text-center text-[11px] font-semibold text-slate-400 border-t border-white/60 bg-white/50">
        © 2026 PrintAssist Portal · Helpline: +1 (855) 618-4642
      </footer>

      <ChatUnavailableModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
