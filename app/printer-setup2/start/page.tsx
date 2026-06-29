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
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#e0f2fe_1.2px,transparent_1.2px)] [background-size:24px_24px] text-slate-800 antialiased flex flex-col justify-between selection:bg-sky-100">
      
      {/* HEADER */}
      {step !== 3 && (
        <header className="bg-white border-b border-sky-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/printer-setup2" className="flex items-center gap-2.5 group">
              <div className="w-8.5 h-8.5 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm shadow-sky-500/20">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">PrintAssist</span>
            </Link>

            <button onClick={() => setChatOpen(true)} className="text-xs font-bold text-slate-500 hover:text-sky-600 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all">
              Live Support
            </button>
          </div>
        </header>
      )}

      {/* TWO-COLUMN WIZARD LAYOUT */}
      <main className="flex-1 flex items-center py-12 px-6">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Progress & Support details */}
          {step !== 3 && (
            <div className="lg:col-span-4 bg-white border border-sky-100 rounded-3xl p-6 shadow-xl shadow-sky-950/5 space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Setup Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-400"}`}>1</div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Choose Printer</div>
                    <div className="text-[10px] text-slate-400">Select printer model</div>
                  </div>
                </div>
                <div className="h-6 w-0.5 bg-slate-100 ml-4" />
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-400"}`}>2</div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Start Setup</div>
                    <div className="text-[10px] text-slate-400">Install printer drivers</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Need immediate assistance? Call our toll-free setup helpline:</p>
                <p className="text-sm font-bold text-sky-600 mt-1">📞 +1 (855) 618-4642</p>
              </div>
            </div>
          )}

          {/* Right Column / Central Wizard Container */}
          <div className={`${step === 3 ? "lg:col-span-12 max-w-2xl mx-auto" : "lg:col-span-8"} w-full bg-white border border-sky-100 rounded-3xl p-8 shadow-xl shadow-sky-950/5`}>
            
            {/* STEP HEADER PROGRESS BAR */}
            {step !== 3 && (
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span>Steps</span>
                  <span>Step {step} of 2</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sky-600 h-full rounded-full transition-all duration-300" style={{ width: step === 1 ? "50%" : "100%" }} />
                </div>
              </div>
            )}

            {/* STEP 1: Choose Model */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Choose Your Printer</h1>
                  <p className="text-slate-500 text-xs leading-relaxed">Search or select your printer from the list below to start the setup.</p>
                </div>

                {/* Search */}
                <div className="relative">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. DeskJet 2700, ENVY 6000..."
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-slate-800 placeholder-slate-400 font-bold outline-none transition-all duration-200 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-300 text-sm shadow-sm"
                  />
                  <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm">🔍</span>
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-3.5 w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">×</button>
                  )}
                </div>

                {/* Grid of Printer Cards (Replacing the single list) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[340px] overflow-y-auto pr-1">
                  {filteredPrinters.map((p, idx) => {
                    const isSelected = printerModel === p.name;
                    return (
                      <div 
                        key={idx}
                        onClick={() => setPrinterModel(p.name)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 group ${isSelected ? "border-sky-500 bg-sky-50/40 shadow-md shadow-sky-500/5" : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{p.icon}</span>
                          <span className="text-[8px] font-bold bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full uppercase">{p.type}</span>
                        </div>
                        <div className="space-y-1">
                          <div className={`font-bold text-sm ${isSelected ? "text-sky-700" : "text-slate-900"}`}>{p.name}</div>
                          <div className="text-[10px] text-slate-400">Click to select model</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <Link href="/printer-setup2" className="text-xs font-bold text-slate-500 hover:text-slate-800">
                    Cancel
                  </Link>
                  <button 
                    disabled={!printerModel}
                    onClick={() => setStep(2)}
                    className={`px-6 py-2.5 font-bold rounded-xl transition-all text-xs ${printerModel ? "bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/10" : "bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-150"}`}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Start Card */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/20">
                  <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">Printer Setup</h3>
                  <p className="text-slate-500 text-xs">Set up the drivers for your <span className="text-sky-600 font-bold">{printerModel}</span>.</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors">
                    Back
                  </button>
                  <button onClick={startInstall} className="flex-1 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-md transition-all">
                    Start
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Spooling & Error */}
            {step === 3 && (
              <div className="w-full">
                {!showError ? (
                  <div className="space-y-6 text-center">
                    <div className="w-10 h-10 mx-auto rounded-full border-4 border-sky-500/30 border-t-sky-600 animate-spin" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900">Setting up printer...</h3>
                      <p className="text-slate-500 text-xs">Please wait a moment.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-sky-500 to-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${installProgress}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>Configuring</span>
                        <span>{Math.floor(installProgress)}%</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    
                    {/* Error Card */}
                    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-red-50 border border-red-100 rounded-3xl">
                      <div className="w-14 h-14 shrink-0 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      </div>
                      <div className="text-center md:text-left space-y-1">
                        <h3 className="text-xl font-black text-red-950">Connection Error</h3>
                        <p className="text-red-700 font-medium text-xs leading-relaxed">The printer could not connect (Error 1603).</p>
                      </div>
                    </div>

                    {/* Helpline Action Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-2">
                        <h4 className="font-bold text-slate-900 text-base">Need Help?</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">Call our helpline to fix this error easily.</p>
                      </div>
                      
                      <div className="rounded-3xl p-6 bg-sky-50 border border-sky-100 text-center space-y-3">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-sky-600 uppercase tracking-widest">Helpline</span>
                          <p className="text-2xl font-black text-slate-900 tracking-wider">+1 (855) 618-4642</p>
                        </div>
                        <a href="tel:+18556184642" className="block">
                          <button className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-md transition-all">
                            Call Helpline
                          </button>
                        </a>
                      </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button onClick={() => setChatOpen(true)} className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all">
                        💬 Chat with Support
                      </button>
                      <button onClick={() => { setStep(1); setShowError(false); setInstallProgress(0); }} className="sm:w-36 py-3.5 bg-transparent hover:bg-slate-100 text-slate-650 font-bold rounded-xl border border-slate-200 transition-colors text-sm">
                        Try Again
                      </button>
                    </div>

                  </motion.div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-sky-100 py-6 text-center text-xs font-medium text-slate-400">
        <p>&copy; 2026 PrintAssist Portal. All rights reserved. Helpline: +1 (855) 618-4642</p>
      </footer>

      <ChatUnavailableModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
    </>
  );
}
