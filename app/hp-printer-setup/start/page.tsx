"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function StartSetup() {
  const [step, setStep] = useState(1);
  const [printerModel, setPrinterModel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [installProgress, setInstallProgress] = useState(0);
  const [showError, setShowError] = useState(false);
  const [installStage, setInstallStage] = useState(0); // 0=idle, 1=checking, 2=downloading, 3=installing

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
    setInstallProgress(0);
    setInstallStage(1); // checking compatibility
    setShowError(false);

    let progress = 0;
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
    <div className="min-h-screen bg-[#f5f5f5] font-sans">
      {/* HP Header */}
      <header className="bg-[#0096d6] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/hp-printer-setup" className="flex items-center gap-3">
              <div className="flex items-center">
                <span className="text-2xl font-bold tracking-tighter">HP</span>
                <span className="ml-2 text-sm font-medium text-white/90 hidden sm:block">
                  Support
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-semibold text-[#2d3539] mb-2">
                Select your HP product
              </h1>
              <p className="text-[#707372] text-lg">
                Let's identify your HP printer to find the correct software and drivers.
              </p>
            </div>

            {/* Search */}
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
              <label className="block text-sm font-medium text-[#2d3539] mb-3">
                Search by product name or number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. DeskJet 2700"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0096d6] focus:border-[#0096d6] outline-none transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Printer List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPrinters.map((model, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => setPrinterModel(model)}
                  className={`p-4 rounded-md border-2 text-left transition-all ${
                    printerModel === model
                      ? "border-[#0096d6] bg-[#e6f4f9]"
                      : "border-gray-200 hover:border-[#0096d6]/40 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0096d6] to-[#0063a0] rounded-md flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </div>
                    <span className="font-medium text-[#2d3539]">{model}</span>
                    {printerModel === model && (
                      <div className="ml-auto w-5 h-5 bg-[#0096d6] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {printerModel && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  onClick={() => setStep(2)}
                  className="px-10 py-3 bg-[#0096d6] hover:bg-[#0063a0] text-white font-semibold rounded-md shadow-sm transition-all"
                >
                  Next
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-[#0096d6] hover:text-[#0063a0]"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-3xl font-semibold text-[#2d3539]">
                  Install HP Smart
                </h1>
              </div>
              <p className="text-[#707372] text-lg ml-9">
                HP Smart helps you setup, scan, and print from anywhere.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-8 shadow-sm">
              <div className="max-w-md mx-auto text-center">
                <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-[#0096d6] to-[#0063a0] rounded-2xl flex items-center justify-center">
                  <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-[#2d3539] mb-3">HP Smart</h2>
                <p className="text-[#707372] mb-8">
                  The best way to setup your printer and manage your HP devices.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => setStep(3)}
                    className="w-full px-8 py-4 bg-[#0096d6] hover:bg-[#0063a0] text-white font-semibold rounded-md shadow-sm transition-all text-lg"
                  >
                    Download HP Smart
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="w-full text-[#0096d6] hover:text-[#0063a0] font-medium underline transition-colors"
                  >
                    Skip downloading HP Smart and continue to install software
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && !showError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center min-h-[70vh]"
          >
            {/* Installer Window */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="bg-[#f9fafb] px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex items-center gap-2 text-[#2d3539] font-medium">
                  <svg className="w-5 h-5 text-[#707372]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                  Device Setup Assistant
                </div>
              </div>

              {/* Installer Content */}
              <div className="p-8">
                {installProgress === 0 ? (
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#e6f4f9] to-[#d0eef7] rounded-2xl flex items-center justify-center">
                      <svg className="w-10 h-10 text-[#0096d6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-[#2d3539] mb-2">
                      Ready to install
                    </h2>
                    <p className="text-[#707372] mb-8">
                      Setting up your {printerModel || "HP Printer"}
                    </p>
                    <button
                      onClick={startInstall}
                      className="px-10 py-3 bg-[#0096d6] hover:bg-[#0063a0] text-white font-semibold rounded-md shadow-sm transition-all"
                    >
                      Install
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#e6f4f9] to-[#d0eef7] rounded-2xl flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#0096d6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="text-lg text-[#707372]">
                        <span className="font-medium text-[#2d3539]">Authorized User</span>
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-6">
                      {/* Check Compatibility */}
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${installStage >= 1 ? "bg-white border-2 border-[#0096d6]" : "bg-white border-2 border-gray-300"}`}>
                          {installStage > 1 ? (
                            <svg className="w-4 h-4 text-[#0096d6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            installStage === 1 && <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-[#0096d6] border-t-transparent rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-[#2d3539] text-lg">
                              Checking Device Compatibility
                            </span>
                            {installStage > 1 && (
                              <span className="text-xs font-medium text-[#28c840] bg-[#eaf9ee] px-2 py-0.5 rounded-full">Verified</span>
                            )}
                          </div>
                          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#0096d6] to-[#0063a0] transition-all duration-300" style={{ width: `${Math.min(installProgress, 25)}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Download */}
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${installStage >= 2 ? "bg-white border-2 border-[#0096d6]" : "bg-white border-2 border-gray-300"}`}>
                          {installStage === 2 && !showError && (
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-[#0096d6] border-t-transparent rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="mb-2">
                            <span className="font-medium text-[#2d3539] text-lg">
                              Downloading Drivers for {printerModel}
                            </span>
                          </div>
                          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#0096d6] to-[#0063a0] transition-all duration-300" style={{ width: `${Math.min(Math.max(installProgress - 25, 0), 45)}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Install */}
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${installStage >= 3 ? "bg-white border-2 border-[#0096d6]" : "bg-white border-2 border-gray-300"}`}>
                          {installStage === 3 && !showError && (
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-[#0096d6] border-t-transparent rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="mb-2">
                            <span className="font-medium text-[#2d3539] text-lg">
                              Installing Package...
                            </span>
                          </div>
                          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#0096d6] to-[#0063a0] transition-all duration-300" style={{ width: `${Math.min(Math.max(installProgress - 70, 0), 30)}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && showError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center min-h-[70vh]"
          >
            {/* Error Page */}
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden relative">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#003366] to-[#0096d6] opacity-10" />

              <div className="relative p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#ff4b6b] to-[#ff9a8a] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">!</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-[#2d3539] mb-6">
                  Printer Driver Installation Error
                </h1>

                <p className="text-xl text-[#dc2626] font-semibold mb-8">
                  We encountered an issue completing the printer driver installation due to error 1603.
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-[#000000] mb-4">
                  Contact HP Support to Resolve this Issue
                </h2>

                <p className="text-xl text-[#2d3539] mb-6">
                  Toll-Free (USA/CA): <span className="font-bold text-[#000000]">+1 (855) 618-4642</span>
                </p>

                <button
                  onClick={() => {}}
                  className="inline-flex items-center gap-3 px-12 py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xl rounded-xl shadow-xl transition-all mb-8"
                >
                  Chat Now
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>

                <p className="text-lg text-[#dc2626] font-medium leading-relaxed">
                  Note: For best results, avoid repeatedly attempting the installation without proper guidance, as it may not resolve the issue. Our experts are here to help you complete the setup correctly.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
