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
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased flex flex-col justify-between selection:bg-blue-900/50">
      
      {/* HEADER */}
      {step !== 3 && (
        <header className="bg-slate-955 border-b border-slate-800 sticky top-0 z-50 shadow-md">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/printer-setup3" className="flex items-center gap-3.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <span className="text-base font-bold text-white tracking-tight">SmartPrint Assist</span>
            </Link>

            <button onClick={() => setChatOpen(true)} className="text-xs font-bold text-slate-400 hover:text-white border border-slate-800 px-4 py-2 rounded-lg hover:bg-slate-900 transition-all">
              Live Support
            </button>
          </div>
        </header>
      )}

      {/* TWO-COLUMN LAYOUT */}
      <main className="flex-1 flex items-center py-12 px-6">
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Progress Steps */}
          {step !== 3 && (
            <div className="md:col-span-4 bg-slate-955 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Setup Steps</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? "bg-blue-600 text-white" : "bg-slate-900 text-slate-500 border border-slate-800"}`}>1</div>
                  <div>
                    <div className="text-xs font-bold text-white">Choose Printer</div>
                    <div className="text-[10px] text-slate-400">Select your printer model</div>
                  </div>
                </div>
                <div className="h-6 w-0.5 bg-slate-800 ml-4" />
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? "bg-blue-600 text-white" : "bg-slate-900 text-slate-500 border border-slate-800"}`}>2</div>
                  <div>
                    <div className="text-xs font-bold text-white">Start Setup</div>
                    <div className="text-[10px] text-slate-400">Run the setup helper</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-855 pt-4">
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Need help? Call our helpline:</p>
                <p className="text-sm font-bold text-blue-400 mt-1">📞 +1 (855) 618-4642</p>
              </div>
            </div>
          )}

          {/* Right Column / Central Wizard Container */}
          <div className={`${step === 3 ? "md:col-span-12 max-w-2xl mx-auto" : "md:col-span-8"} w-full bg-slate-955 border border-slate-800 rounded-3xl p-8 shadow-xl`}>
            
            {/* STEP HEADER PROGRESS BAR */}
            {step !== 3 && (
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>Steps</span>
                  <span>Step {step} of 2</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: step === 1 ? "50%" : "100%" }} />
                </div>
              </div>
            )}

            {/* STEP 1: Identify Model */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl font-black text-white tracking-tight">Choose Your Printer</h1>
                  <p className="text-slate-400 text-xs leading-relaxed">Search or select your printer from the list below to start the setup.</p>
                </div>

                {/* Search */}
                <div className="relative">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. DeskJet 2700, ENVY 6000..."
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-white placeholder-slate-600 font-bold outline-none transition-all duration-200 bg-slate-900 border border-slate-800 focus:bg-slate-955 focus:border-blue-500 text-sm"
                  />
                  <span className="absolute left-3.5 top-3.5 text-sm">🔍</span>
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-3 w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold">×</button>
                  )}
                </div>

                {/* Vertical Select List */}
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {filteredPrinters.map((p, idx) => {
                    const isSelected = printerModel === p.name;
                    return (
                      <div 
                        key={idx}
                        onClick={() => setPrinterModel(p.name)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${isSelected ? "border-blue-500 bg-blue-900/10" : "border-slate-800 bg-slate-900/40 hover:border-slate-700"}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl shrink-0">{p.icon}</span>
                          <div>
                            <div className={`font-bold text-sm ${isSelected ? "text-blue-400" : "text-white"}`}>{p.name}</div>
                            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{p.type}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <Link href="/printer-setup3" className="text-xs font-bold text-slate-400 hover:text-white">
                    Cancel
                  </Link>
                  <button 
                    disabled={!printerModel}
                    onClick={() => setStep(2)}
                    className={`px-8 py-3.5 font-bold rounded-xl transition-all text-sm ${printerModel ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10" : "bg-slate-900 text-slate-500 cursor-not-allowed border border-slate-800"}`}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Download Card */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Printer Setup</h3>
                  <p className="text-slate-400 text-xs">Set up the drivers for your <span className="text-blue-400 font-bold">{printerModel}</span>.</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold rounded-xl text-xs transition-colors border border-slate-800">
                    Back
                  </button>
                  <button onClick={startInstall} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all">
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
                    <div className="w-10 h-10 mx-auto rounded-full border-4 border-blue-500/30 border-t-blue-600 animate-spin" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">Setting up printer...</h3>
                      <p className="text-slate-400 text-xs">Please wait a moment.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-sky-600 h-full rounded-full transition-all duration-300" style={{ width: `${installProgress}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        <span>Configuring</span>
                        <span>{Math.floor(installProgress)}%</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    
                    {/* Redesigned Terminal Error Header Card */}
                    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-rose-955/40 border border-rose-900/30 rounded-3xl">
                      <div className="w-16 h-16 shrink-0 rounded-2xl bg-rose-900/20 text-rose-500 flex items-center justify-center border border-rose-900/30">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      </div>
                      <div className="text-center md:text-left space-y-1">
                        <h3 className="text-xl font-black text-rose-400">Connection Error</h3>
                        <p className="text-rose-500/80 font-medium text-xs leading-relaxed">The printer could not connect (Error 1603).</p>
                      </div>
                    </div>

                    {/* Redesigned Helpline Action Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-2">
                        <h4 className="font-bold text-white text-base">Need Help?</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">Call our helpline to fix this error easily.</p>
                      </div>
                      
                      <div className="rounded-3xl p-6 bg-slate-900 border border-slate-800 text-center space-y-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Helpline</span>
                          <p className="text-2xl font-black text-white mt-1 tracking-wider">+1 (855) 618-4642</p>
                        </div>
                        <a href="tel:+18556184642" className="block">
                          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all">
                            Call Helpline
                          </button>
                        </a>
                      </div>
                    </div>

                    <div className="h-px bg-slate-800" />

                    {/* Footer Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button onClick={() => setChatOpen(true)} className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all">
                        💬 Chat with Support
                      </button>
                      <button onClick={() => { setStep(1); setShowError(false); setInstallProgress(0); }} className="sm:w-36 py-3.5 bg-transparent hover:bg-slate-900 text-slate-400 hover:text-white font-bold rounded-xl border border-slate-800 transition-colors text-sm">
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
      <footer className="bg-slate-955 border-t border-slate-800 py-6 text-center text-xs font-medium text-slate-500">
        <p>&copy; 2026 SmartPrint Portal. All rights reserved. Helpline: +1 (855) 618-4642</p>
      </footer>

      <ChatUnavailableModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
    </>
  );
}
