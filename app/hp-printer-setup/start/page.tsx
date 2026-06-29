"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function StartSetup() {
  const [step, setStep] = useState(1);
  const [printerModel, setPrinterModel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [installProgress, setInstallProgress] = useState(0);
  const [showError, setShowError] = useState(false);
  const [installStage, setInstallStage] = useState(0); // 0=idle, 1=checking, 2=downloading, 3=installing
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allPrinters = [
    "HP DeskJet 2700 Series",
    "HP DeskJet 4100 Series",
    "HP ENVY 6000 Series",
    "HP ENVY 6400 Series",
    "HP OfficeJet 8000 Series",
    "HP OfficeJet Pro 9000 Series",
    "HP LaserJet Pro MFP",
    "HP Smart Tank 5100 Series",
    "HP DeskJet Plus 4100",
    "HP ENVY Photo 7100",
    "HP OfficeJet 5200",
    "HP LaserJet Enterprise",
  ];

  const filteredPrinters = searchQuery
    ? allPrinters.filter((p) =>
        p.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allPrinters;

  const startInstall = () => {
    setStep(3);
    setInstallProgress(1); // Set to 1 directly to skip the "Ready to Configure" screen
    setInstallStage(1); // checking compatibility
    setShowError(false);

    let progress = 1;
    let currentStage = 1;

    const interval = setInterval(() => {
      progress += Math.random() * 8;

      if (progress >= 25 && currentStage === 1) {
        currentStage = 2; // downloading
        setInstallStage(2);
      } else if (progress >= 70 && currentStage === 2) {
        currentStage = 3; // installing
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-[#0096D6]/20 selection:text-[#0063A0]">
      {/* HP Header - Only render when not in full-screen installation step 3 */}
      {step !== 3 && (
        <header className="bg-[#003366] text-white sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/hp-printer-setup/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-white text-[#003366] flex items-center justify-center shadow-md font-black text-xl group-hover:scale-105 transition-transform duration-300">
                  HP
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight leading-none text-white">Printer Support</span>
                  <span className="text-[10px] text-[#0096D6] font-semibold tracking-wider uppercase mt-0.5">Setup Assistant</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link href="/hp-printer-setup/" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Support Home
                </Link>
                <a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Drivers & Software
                </a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Contact Support
                </a>
              </nav>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
                aria-label="Toggle Menu"
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

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden bg-[#002244] border-t border-white/10 shadow-inner overflow-hidden"
              >
                <div className="px-4 py-5 space-y-4 text-base font-medium">
                  <Link
                    href="/hp-printer-setup/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Support Home
                  </Link>
                  <a
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Drivers & Software
                  </a>
                  <a
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Contact Support
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      {/* Main Content */}
      <main className={step === 3 ? "" : "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16"}>
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Identify Your Printer
              </h1>
              <p className="text-slate-500 text-lg font-light">
                Search or select your model below to locate compatible setup software and system drivers.
              </p>
            </div>

            {/* Search */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Search by printer model name or number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. DeskJet 2700"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0096D6]/40 focus:border-[#0096D6] outline-none transition-all text-slate-800 placeholder-slate-400 font-medium"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Printer List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredPrinters.map((model, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => setPrinterModel(model)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 shadow-sm ${
                    printerModel === model
                      ? "border-[#0096d6] bg-[#e6f4f9] shadow-md shadow-[#0096D6]/5"
                      : "border-slate-200/80 hover:border-[#0096d6]/40 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0096d6] to-[#0063a0] rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-slate-800 text-base">{model}</span>
                    {printerModel === model && (
                      <div className="ml-auto w-6 h-6 bg-[#0096d6] rounded-full flex items-center justify-center shadow-sm">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Bottom Nav Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-200 mt-8">
              <Link href="/hp-printer-setup/">
                <button className="px-6 py-2.5 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-medium rounded-xl transition-all text-sm flex items-center gap-2 shadow-sm bg-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
              </Link>
              
              <button
                disabled={!printerModel}
                onClick={() => setStep(2)}
                className={`px-8 py-3 font-semibold rounded-xl transition-all text-sm shadow-md ${
                  printerModel
                    ? "bg-[#0096D6] hover:bg-[#0063A0] text-white hover:shadow-[#0096D6]/20"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                Continue Setup
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => setStep(1)}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-[#0096d6] hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-3xl font-bold text-slate-900">
                  Download Setup Application
                </h1>
              </div>
              <p className="text-slate-500 text-lg font-light ml-11">
                HP Smart application helps setup connection, scan files, and coordinate drivers.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 md:p-12 shadow-sm max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#0096d6] to-[#0063a0] rounded-2xl flex items-center justify-center shadow-lg relative">
                  <div className="absolute inset-0 bg-[#0096D6]/20 blur-md rounded-full -z-10" />
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Deploy Setup Assistant</h2>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8 font-light leading-relaxed">
                  The recommended tool to interface your {printerModel || "printer"} and configure drivers.
                </p>

                <div className="space-y-4 max-w-md mx-auto">
                  <button
                    onClick={startInstall}
                    className="w-full px-8 py-4 bg-[#0096d6] hover:bg-[#0063a0] text-white font-bold rounded-xl shadow-lg hover:shadow-[#0096D6]/20 hover:scale-[1.01] active:scale-[0.99] transition-all text-base"
                  >
                    Install HP Smart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <div className="min-h-screen bg-gradient-to-br from-[#004e82] via-[#005a96] to-[#007cc0] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
            {/* Background Texture overlay for Windows Setup Vibes */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_55%)] pointer-events-none" />

            {!showError ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10"
              >
                {/* Windows/Mac App Header Controls Mockup */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600 font-bold text-xs tracking-wide">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                    Device Setup Assistant
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                  </div>
                </div>

                <div className="p-8 md:p-10 space-y-8">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 bg-[#e6f4f9] rounded-lg flex items-center justify-center animate-pulse">
                      <svg className="w-5.5 h-5.5 text-[#0096d6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-slate-800">Secure Installer Session</p>
                      <p className="text-slate-400 text-xs">Configuring {printerModel || "Device"}</p>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="space-y-6">
                    {/* Check Compatibility */}
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${installStage >= 1 ? "bg-white border-2 border-[#0096d6]" : "bg-white border-2 border-slate-200"}`}>
                        {installStage > 1 ? (
                          <svg className="w-4 h-4 text-[#0096d6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          installStage === 1 && <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="w-4.5 h-4.5 border-2 border-[#0096d6] border-t-transparent rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-slate-800 text-sm">
                            Verifying Device System Parameters
                          </span>
                          {installStage > 1 && (
                            <span className="text-[10px] font-bold text-[#28c840] bg-[#eaf9ee] px-2 py-0.5 rounded-full uppercase tracking-wider">Pass</span>
                          )}
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#0096d6] to-[#0063a0] transition-all duration-300" style={{ width: `${Math.min(installProgress, 25) * 4}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Download */}
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${installStage >= 2 ? "bg-white border-2 border-[#0096d6]" : "bg-white border-2 border-slate-200"}`}>
                        {installStage > 2 ? (
                          <svg className="w-4 h-4 text-[#0096d6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          installStage === 2 && !showError && <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="w-4.5 h-4.5 border-2 border-[#0096d6] border-t-transparent rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="font-semibold text-slate-800 text-sm">
                            Downloading Driver Packages
                          </span>
                          {installStage === 2 && (
                            <span className="text-[10px] text-slate-400 font-medium">Downloading...</span>
                          )}
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#0096d6] to-[#0063a0] transition-all duration-300" style={{ width: `${(Math.min(Math.max(installProgress - 25, 0), 45) / 45) * 100}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Install */}
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${installStage >= 3 ? "bg-white border-2 border-[#0096d6]" : "bg-white border-2 border-slate-200"}`}>
                        {installStage === 3 && !showError && (
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="w-4.5 h-4.5 border-2 border-[#0096d6] border-t-transparent rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="font-semibold text-slate-800 text-sm">
                            Writing Driver Registry Keys
                          </span>
                          {installStage === 3 && !showError && (
                            <span className="text-[10px] text-slate-400 font-medium">Registering...</span>
                          )}
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#0096d6] to-[#0063a0] transition-all duration-300" style={{ width: `${(Math.min(Math.max(installProgress - 70, 0), 30) / 30) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl bg-white rounded-[2.2rem] shadow-2xl overflow-hidden relative z-10 border border-white/10"
              >
                <div className="p-8 sm:p-12 md:p-14 text-center">
                  {/* Styled Circular Indicator matching the pink/rose dot */}
                  <div className="w-16 h-16 mx-auto mb-8 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#EC4899] to-[#F43F5E] rounded-full shadow-lg shadow-[#F43F5E]/30" />
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight leading-tight mb-5">
                    Printer Driver Installation Error
                  </h1>
                  
                  {/* Red Error Message */}
                  <div className="text-red-600 font-semibold text-base sm:text-lg max-w-xl mx-auto my-6 leading-relaxed">
                    We encountered an issue completing the printer driver installation due to error 1603.
                  </div>

                  {/* Contact Support Action Header */}
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight mt-10 mb-4">
                    Contact HP Support to Resolve this Issue
                  </h2>

                  {/* Helpline Details */}
                  <div className="text-slate-600 text-sm sm:text-base font-medium mb-8">
                    Toll-Free (USA/CA): <span className="font-extrabold text-[#1E293B] text-base sm:text-lg ml-1">+1 (855) 618-4642</span>
                  </div>

                  {/* Chat Now Button (Styled blue pill with hover scale and double arrow) */}
                  <div className="mb-10">
                    <button
                      onClick={() => {}}
                      className="px-12 py-4.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-2xl shadow-xl hover:shadow-[#2563EB]/25 transition-all text-base sm:text-lg flex items-center justify-center gap-2 mx-auto active:scale-[0.98]"
                    >
                      Chat Now
                      <span className="text-xl font-extrabold leading-none">»</span>
                    </button>
                  </div>

                  {/* Warning Footnote */}
                  <div className="max-w-xl mx-auto mt-8 border-t border-slate-100 pt-8">
                    <p className="text-xs sm:text-sm text-red-500 font-semibold leading-relaxed">
                      Note: For best results, avoid repeatedly attempting the installation without proper guidance, as it may not resolve the issue. Our experts are here to help you complete the setup correctly.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
