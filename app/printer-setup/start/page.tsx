"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ChatUnavailableModal from "../components/ChatUnavailableModal";

export default function StartSetup() {
  const [step, setStep] = useState(1);
  const [printerModel, setPrinterModel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [installProgress, setInstallProgress] = useState(0);
  const [showError, setShowError] = useState(false);
  const [installStage, setInstallStage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const allPrinters = [
    { name: "DeskJet 2700 Series", type: "All-in-One", icon: "🖨️" },
    { name: "DeskJet 4100 Series", type: "All-in-One", icon: "🖨️" },
    { name: "ENVY 6000 Series", type: "Photo Smart", icon: "📸" },
    { name: "ENVY 6400 Series", type: "Photo Smart", icon: "📸" },
    { name: "OfficeJet 8000 Series", type: "Office Pro", icon: "💼" },
    { name: "OfficeJet Pro 9000 Series", type: "Office Pro", icon: "💼" },
    { name: "LaserJet Pro MFP", type: "Laser Jet", icon: "⚡" },
    { name: "Smart Tank 5100 Series", type: "Ink Tank", icon: "🔋" },
    { name: "DeskJet Plus 4100", type: "All-in-One", icon: "🖨️" },
    { name: "ENVY Photo 7100", type: "Photo Smart", icon: "📸" },
    { name: "OfficeJet 5200", type: "Office Pro", icon: "💼" },
    { name: "LaserJet Enterprise", type: "Enterprise", icon: "⚡" },
  ];

  const filteredPrinters = searchQuery
    ? allPrinters.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allPrinters;

  const startInstall = () => {
    setStep(3);
    setInstallProgress(1);
    setInstallStage(1);
    setShowError(false);

    let progress = 1;
    let currentStage = 1;

    const interval = setInterval(() => {
      progress += Math.random() * 8;

      if (progress >= 25 && currentStage === 1) {
        currentStage = 2;
        setInstallStage(2);
      } else if (progress >= 70 && currentStage === 2) {
        currentStage = 3;
        setInstallStage(3);
      }

      setInstallProgress(Math.min(progress, 70));

      if (progress >= 70) {
        clearInterval(interval);
        setTimeout(() => {
          setShowError(true);
        }, 800);
      }
    }, 800);
  };

  return (
    <>
    <div className="min-h-screen hp-bg dot-grid text-slate-800 antialiased flex flex-col justify-between">
      {/* ═══ HEADER ═══ */}
      {step !== 3 && (
        <header className="glass sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/printer-setup/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0096D6] to-[#0063A0] flex items-center justify-center shadow-lg shadow-[#0096D6]/30 group-hover:scale-105 transition-all duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </div>
                <div>
                  <div className="text-base font-black text-slate-900 leading-none">Printer Support</div>
                  <div className="text-[10px] text-[#0096D6] font-bold uppercase tracking-widest mt-0.5">Setup Assistant</div>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
                <Link href="/printer-setup/" className="text-slate-600 hover:text-[#0096D6] transition-colors duration-200">
                  Support Home
                </Link>
                <a href="#" className="text-slate-600 hover:text-[#0096D6] transition-colors duration-200">
                  Drivers & Software
                </a>
                <a href="#" className="text-slate-600 hover:text-[#0096D6] transition-colors duration-200">
                  Contact Support
                </a>
              </nav>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t border-slate-200 overflow-hidden bg-white"
              >
                <div className="px-4 py-5 space-y-2">
                  <Link href="/printer-setup/" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-4 rounded-lg text-slate-600 hover:text-[#0096D6] hover:bg-slate-50 transition-all font-medium">
                    Support Home
                  </Link>
                  <a href="#" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-4 rounded-lg text-slate-600 hover:text-[#0096D6] hover:bg-slate-50 transition-all font-medium">
                    Drivers & Software
                  </a>
                  <a href="#" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-4 rounded-lg text-slate-600 hover:text-[#0096D6] hover:bg-slate-50 transition-all font-medium">
                    Contact Support
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* ═══ Progress Hub Header (only step 1 & 2) ═══ */}
          {step !== 3 && (
            <div className="flex justify-between items-center mb-8 bg-white/50 border border-slate-200/60 rounded-2xl p-4 shadow-sm backdrop-blur-sm max-w-4xl mx-auto">
              <div className="flex items-center gap-6">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= s
                        ? "bg-[#0096D6] text-white shadow-md shadow-[#0096D6]/20"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}>
                      {step > s ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : s}
                    </div>
                    <span className={`text-xs font-black uppercase tracking-wider ${step >= s ? "text-slate-800" : "text-slate-400"}`}>
                      {s === 1 ? "Select Model" : "Install Driver"}
                    </span>
                    {s < 2 && <div className={`w-12 h-px ${step > s ? "bg-[#0096D6]" : "bg-slate-200"} transition-colors duration-300`} />}
                  </div>
                ))}
              </div>
              <div className="hidden sm:block text-xs font-bold text-slate-400">
                Setup Session ID: <span className="text-[#0096D6]">#ST-2026</span>
              </div>
            </div>
          )}

          {/* ═══ STEP 1: Select Printer (Stunning New Card Style) ═══ */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Info Title */}
              <div className="text-center md:text-left space-y-2">
                <div className="section-label inline-flex mx-auto">
                  🖨️ Step 1 of 2
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Identify Your Printer</h1>
                <p className="text-slate-500 text-base font-medium">
                  Search or select your model below to locate compatible setup software and system drivers.
                </p>
              </div>

              {/* Enhanced Search Input */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm transition-all focus-within:shadow-md focus-within:border-[#0096D6]/40">
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-400 font-medium text-sm">
                    🔍 Search Printer:
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. DeskJet 2700, ENVY 6000..."
                    className="w-full pl-36 pr-12 py-3 rounded-2xl text-slate-800 placeholder-slate-400 font-bold outline-none transition-all duration-200 bg-slate-50 border border-slate-200/80 focus:bg-white"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs hover:bg-slate-300 font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Grid of Interactive Printer Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPrinters.map((printer, index) => {
                  const isSelected = printerModel === printer.name;
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.012 }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => setPrinterModel(printer.name)}
                      className="p-5 rounded-2xl text-left transition-all duration-200 relative overflow-hidden bg-white border"
                      style={{
                        borderColor: isSelected ? "#0096D6" : "#e2e8f0",
                        boxShadow: isSelected 
                          ? "0 10px 25px -5px rgba(0, 150, 214, 0.15)"
                          : "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
                      }}
                    >
                      {/* Top Right category pill tag */}
                      <span className={`absolute top-4 right-4 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isSelected 
                          ? "bg-[#e6f4f9] text-[#0063A0]" 
                          : "bg-slate-50 text-slate-500 border border-slate-100"
                      }`}>
                        {printer.type}
                      </span>

                      <div className="flex items-center gap-4">
                        {/* Avatar status area */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 ${
                          isSelected
                            ? "bg-[#0096D6] text-white shadow-md"
                            : "bg-slate-50 border border-slate-100 text-slate-400"
                        }`}>
                          {printer.icon}
                        </div>

                        <div>
                          <div className={`font-black text-sm ${isSelected ? "text-[#0063A0]" : "text-slate-800"}`}>
                            {printer.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                            Auto-Detect Compatible
                          </div>
                        </div>

                        {/* Selected Indicator Checkmark */}
                        {isSelected && (
                          <div className="ml-auto w-6 h-6 bg-[#0096D6] rounded-full flex items-center justify-center shadow-md">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom Nav Actions */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-200 mt-8">
                <Link href="/printer-setup/">
                  <button className="px-6 py-3 text-slate-600 hover:text-slate-900 font-bold rounded-xl transition-all text-sm flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                </Link>
                <button
                  disabled={!printerModel}
                  onClick={() => setStep(2)}
                  className={`px-8 py-3.5 font-black rounded-xl transition-all text-sm flex items-center gap-2 ${
                    printerModel
                      ? "btn-hp shadow-lg"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  }`}
                >
                  Continue Setup
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 2: Download Setup App ═══ */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              {/* Header Title */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <button
                    onClick={() => setStep(1)}
                    className="p-2 rounded-xl text-slate-500 hover:text-[#0096D6] transition-colors border border-slate-200 bg-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="section-label">
                    ⬇️ Step 2 of 2
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">Download Setup Application</h1>
                <p className="text-slate-600 text-base font-semibold">
                  Deploy our printer utility software to easily link connections and install correct driver libraries.
                </p>
              </div>

              {/* Download Main Card */}
              <div className="glass-card rounded-3xl p-10 md:p-14 border border-slate-200">
                <div className="text-center space-y-8">
                  {/* Glowing Icon visual */}
                  <div className="relative inline-flex">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0096D6] to-[#0063A0] flex items-center justify-center shadow-xl shadow-[#0096D6]/20">
                      <svg className="w-12 h-12 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs shadow-md text-white font-bold">✓</span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Deploy Setup Assistant</h2>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                      Recommended installer for your <span className="text-[#0096D6] font-bold">{printerModel}</span>. Runs checks automatically.
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left">
                    {["Auto-detect network", "Registry configuration", "Spooler optimization", "Wi-Fi pairing"].map((feat) => (
                      <div key={feat} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700 flex items-center gap-2">
                        <span className="text-emerald-500">✓</span> {feat}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={startInstall}
                    className="w-full px-8 py-4 btn-hp text-white font-bold rounded-xl text-base flex items-center justify-center gap-2"
                  >
                    🚀 Download & Run Installer
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 3: Progress & Error screen ═══ */}
          {step === 3 && (
            <div className="flex items-center justify-center min-h-[70vh]">
              {!showError ? (
                // Installation Monitor
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-lg rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-2xl"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-[#0096D6] via-blue-500 to-[#0063A0]" />
                  <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-xs tracking-wide">
                      <svg className="w-4 h-4 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      </svg>
                      Setup Monitor
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="flex items-center gap-4 rounded-xl p-4 bg-blue-50 border border-blue-100">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center animate-pulse bg-blue-100 text-[#0096D6]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">Secure Installer Session</p>
                        <p className="text-slate-500 text-xs">Configuring {printerModel || "Device"}</p>
                      </div>
                    </div>

                    {/* Checkpoints */}
                    <div className="space-y-6">
                      {[
                        { stage: 1, label: "Verifying Device System Parameters", progressWidth: `${Math.min(installProgress, 25) * 4}%`, doneLabel: "Pass" },
                        { stage: 2, label: "Downloading Driver Packages", progressWidth: `${(Math.min(Math.max(installProgress - 25, 0), 45) / 45) * 100}%`, doneLabel: "Done" },
                        { stage: 3, label: "Writing Driver Registry Keys", progressWidth: `${(Math.min(Math.max(installProgress - 70, 0), 30) / 30) * 100}%`, doneLabel: "Done" },
                      ].map((s) => (
                        <div key={s.stage} className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${installStage >= s.stage ? "border-[#0096D6]" : "border-slate-300"} bg-white`}>
                            {installStage > s.stage ? (
                              <svg className="w-4 h-4 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : installStage === s.stage ? (
                              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-[#0096D6] border-t-transparent rounded-full" />
                            ) : null}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-semibold text-slate-700 text-sm">{s.label}</span>
                              {installStage > s.stage && (
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{s.doneLabel}</span>
                              )}
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100">
                              <div className="h-full rounded-full bg-gradient-to-r from-[#0096D6] to-cyan-400" style={{ width: s.progressWidth }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Error screen
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-xl rounded-3xl overflow-hidden bg-white border border-rose-200 shadow-2xl"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500" />
                  <div className="p-10 sm:p-12 text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-xl shadow-rose-100 bg-rose-50 border border-rose-100 text-rose-500">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>

                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Printer Driver Installation Error</h1>
                      <p className="text-rose-600 font-bold text-base leading-relaxed max-w-sm mx-auto">
                        We encountered an issue completing the printer driver installation due to error 1603.
                      </p>
                    </div>

                    <div className="h-px bg-slate-100" />

                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Contact Support to Resolve</h2>
                      <div className="rounded-xl p-5 mb-6 bg-slate-50 border border-slate-200">
                        <p className="text-slate-500 text-xs mb-1 font-bold uppercase tracking-wider">Toll-Free Helpline</p>
                        <p className="text-2xl font-black text-slate-950">+1 (855) 618-4642</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setChatOpen(true)}
                      className="w-full px-8 py-4 text-white font-black rounded-2xl text-lg shadow-xl hover:shadow-[#0096D6]/20 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-3 bg-gradient-to-r from-[#0096D6] to-[#0063A0]">
                      💬 Chat Now
                      <span className="text-xl font-black">»</span>
                    </button>

                    <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100">
                      <p className="text-xs text-rose-600 font-semibold leading-relaxed">
                        ⚠️ Note: For best results, avoid repeatedly attempting the installation without proper guidance. Our experts are here to help you complete the setup correctly.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      {step !== 3 && (
        <footer className="py-6 border-t border-slate-200/80 bg-white/60 backdrop-blur-sm text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4">
            <p>© 2026 Printer Setup Assistant. All rights reserved. Support helpline: +1 (855) 618-4642</p>
          </div>
        </footer>
      )}
    </div>
      <ChatUnavailableModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
