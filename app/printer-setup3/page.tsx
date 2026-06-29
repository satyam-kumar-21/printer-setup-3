"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Modal from "./components/Modal";
import ChatUnavailableModal from "./components/ChatUnavailableModal";

/* ── Animated counter hook ── */
function useCounter(target: number, duration = 1800, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

/* ── Printer Icon ── */
function PrinterIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  );
}

export default function Page() {
  const [selectedPrinter, setSelectedPrinter] = useState<{ name: string; content: string } | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const c1 = useCounter(50000, 2000, statsInView);
  const c2 = useCounter(99, 1800, statsInView);

  const printers = [
    { name: "DeskJet Series", desc: "All-in-one printers for everyday home use", icon: "🖨️", tag: "Most Popular" },
    { name: "ENVY Photo Series", desc: "Premium photo and document printing quality", icon: "📸", tag: "Top Rated" },
    { name: "OfficeJet Pro Series", desc: "High-performance professional office solution", icon: "💼", tag: "Business" },
    { name: "LaserJet Pro Series", desc: "Lightning-fast professional laser printing", icon: "⚡", tag: "Enterprise" },
    { name: "Smart Tank Series", desc: "High-volume, ultra-low cost tank technology", icon: "🔋", tag: "Best Value" },
    { name: "DesignJet Series", desc: "Large format professional plotter precision", icon: "🗺️", tag: "Pro Design" },
  ];

  const printerContents: Record<string, string> = {
    "DeskJet Series": "DeskJet printers are perfect for home use, offering printing, scanning, and copying capabilities. These affordable printers are easy to set up and use, with wireless printing options available on many models. Ideal for everyday printing tasks like homework, documents, and photos.",
    "ENVY Photo Series": "ENVY printers deliver professional-quality prints for both photos and documents. With advanced features like automatic two-sided printing, wireless connectivity, and smart printer app integration, ENVY printers are perfect for creative projects and home offices.",
    "OfficeJet Pro Series": "OfficeJet printers are designed for small business and home office use. With fast printing speeds, high-capacity ink cartridges, and advanced scanning features, OfficeJet printers help you stay productive and efficient.",
    "LaserJet Pro Series": "LaserJet printers offer fast, professional-quality printing with sharp text and graphics. These reliable printers are perfect for busy offices, with options for color printing, wireless connectivity, and high-volume printing.",
    "Smart Tank Series": "Smart Tank printers feature innovative ink tank technology, delivering thousands of prints at a low cost per page. With easy-to-refill ink tanks and wireless printing, Smart Tank printers are great for high-volume printing needs.",
    "DesignJet Series": "DesignJet printers are professional large-format printers perfect for architects, engineers, and designers. Print high-quality blueprints, posters, and banners with exceptional color accuracy and detail.",
  };

  const issues = [
    { title: "Printer Status Offline", desc: "Fix offline printer connection now", content: "If your printer is showing as offline, check the power and cables first. Restart your printer and computer. For wireless printers, make sure your Wi-Fi is working. You can also use our setup helper to fix connection issues." },
    { title: "Printer Not Printing", desc: "Fix printing errors and empty page errors", content: "If your printer will not print, check the paper tray and ink. Try printing a test page. Restart your computer and try again." },
    { title: "Driver Installation Error", desc: "Fix driver setup and installation errors", content: "If you get a driver error, download the latest drivers from the website, restart your computer, and run the setup file again." },
    { title: "Wi-Fi Connection Issues", desc: "Fix wireless and network setup issues", content: "For Wi-Fi issues, check your router. Make sure your printer is close to the router. Restart your router and printer, then try to connect again." },
    { title: "Scanner Not Working", desc: "Fix scanning errors and document feeder issues", content: "If your scanner is not working, check the USB or Wi-Fi connection. Make sure the scanner software is installed on your computer." },
  ];

  const setupTabs = [
    {
      label: "Windows",
      icon: "🪟",
      steps: [
        { n: "01", title: "Download App", desc: "Get the printer app for Windows 10 or 11." },
        { n: "02", title: "Run Setup", desc: "Open the downloaded file and follow the simple steps on your screen." },
        { n: "03", title: "Connect Printer", desc: "Choose Wi-Fi or USB connection. Make sure your PC and printer are on the same network." },
        { n: "04", title: "Print Test Page", desc: "Print a test page to make sure your printer is working." },
      ],
    },
    {
      label: "macOS",
      icon: "🍎",
      steps: [
        { n: "01", title: "Open Settings", desc: "Go to the Apple Menu → System Settings → Printers & Scanners." },
        { n: "02", title: "Add Printer", desc: "Click the Add button and select your printer from the list." },
        { n: "03", title: "Install Driver", desc: "Your Mac will automatically download and install the printer driver." },
        { n: "04", title: "Print Test Page", desc: "Set it as your default printer and print a test page." },
      ],
    },
  ];

  const filteredPrinters = searchQuery
    ? printers.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : printers;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased flex flex-col md:flex-row">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className={`w-full md:w-64 bg-slate-955 border-b md:border-b-0 md:border-r border-slate-800 shrink-0 z-50 transition-all duration-300 ${sidebarOpen ? "h-screen fixed inset-0" : "h-auto"}`}>
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8">
              <Link href="/printer-setup3" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <PrinterIcon />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">SmartPrint</span>
              </Link>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-slate-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>

            <nav className="space-y-2">
              <a href="#dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-blue-400 font-bold text-sm">
                <span>📊</span> Home
              </a>
              <a href="#guides" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all font-semibold text-sm">
                <span>📖</span> Setup Guides
              </a>
              <a href="#troubleshoot" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all font-semibold text-sm">
                <span>🛠️</span> Troubleshoot
              </a>
              <Link href="/printer-setup3/start/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all font-semibold text-sm">
                <span>⚡</span> Start Setup
              </Link>
            </nav>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-center">
              <span className="text-[10px] uppercase font-black text-blue-500 tracking-widest block mb-1">Helpline</span>
              <p className="text-sm font-black text-white">+1 (855) 618-4642</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10" id="dashboard">
        
        {/* TOP STATUS BAR */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">SmartPrint Assist</h2>
            <p className="text-slate-400 text-xs mt-1">Easy Printer Setup Portal</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Status: Active
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-300">
              <span>📞</span> Support Online
            </div>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Main Quick Action */}
          <div className="lg:col-span-8 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
            <div className="space-y-4 relative z-10">
              <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white">
                New Setup
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Connect and set up your printer easily.
              </h3>
              <p className="text-blue-100 text-sm max-w-lg">
                Get the right drivers and software for your printer. Follow simple steps to get started.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-6 relative z-10">
              <Link href="/printer-setup3/start/" className="px-8 py-4 bg-white hover:bg-slate-150 text-blue-900 font-bold rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm">
                Start Setup
              </Link>
              <button onClick={() => setChatOpen(true)} className="px-8 py-4 bg-blue-950/40 hover:bg-blue-950/60 border border-blue-400/30 text-white font-bold rounded-2xl shadow-sm transition-transform hover:-translate-y-0.5 text-sm">
                Chat with Support
              </button>
            </div>
          </div>

          {/* Card 2: Live Helpline Center */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
                📞
              </div>
              <h4 className="text-lg font-bold text-white">Setup Helpline</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Having trouble with your setup or drivers? Call our helpline to talk to a helper.
              </p>
            </div>
            <div className="space-y-4 pt-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Helpline Number</span>
                <p className="text-xl sm:text-2xl font-black text-white mt-1 tracking-wider">+1 (855) 618-4642</p>
              </div>
              <a href="tel:+18556184642" className="block text-center w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors">
                Call Helpline
              </a>
            </div>
          </div>

          {/* Card 3: Setup Guides */}
          <div id="guides" className="lg:col-span-12 bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <h4 className="text-lg font-bold text-white">Simple Setup Guides</h4>
                <p className="text-slate-400 text-xs">Easy steps for your computer</p>
              </div>
              <div className="flex gap-2 p-1 bg-slate-900 border border-slate-850 rounded-xl">
                {setupTabs.map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === idx ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {setupTabs[activeTab].steps.map((s, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 space-y-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs">{s.n}</div>
                    <h5 className="font-bold text-white text-sm">{s.title}</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card 4: Troubleshooter */}
          <div id="troubleshoot" className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white">Common Fixes</h4>
              <p className="text-slate-400 text-xs">Quick solutions for common printer errors</p>
            </div>

            <div className="space-y-3">
              {issues.map((issue, idx) => {
                const isExpanded = expandedIssue === idx;
                return (
                  <div key={idx} className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden">
                    <div
                      onClick={() => setExpandedIssue(isExpanded ? null : idx)}
                      className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-850/50 transition-colors"
                    >
                      <div>
                        <h5 className="font-bold text-white text-sm">{issue.title}</h5>
                        <p className="text-slate-400 text-[10px] mt-0.5">{issue.desc}</p>
                      </div>
                      <span className={`text-lg font-bold transition-transform duration-300 ${isExpanded ? "rotate-45 text-rose-500" : "text-blue-500"}`}>+</span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="px-5 pb-5 pt-1 border-t border-slate-800/60 text-slate-300 text-xs leading-relaxed font-medium">
                            {issue.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 5: Supported Printers */}
          <div id="supported-printers" className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white">Printers List</h4>
                <p className="text-slate-400 text-xs">Search for your printer model</p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type your printer model..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 bg-slate-900 border border-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <span className="absolute left-3 top-3 text-xs">🔍</span>
              </div>

              {/* Scrollable list */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {filteredPrinters.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPrinter({ name: p.name, content: printerContents[p.name] })}
                    className="p-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-850 rounded-xl flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{p.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{p.name}</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">{p.desc}</div>
                      </div>
                    </div>
                    <span className="text-[8px] bg-slate-800 text-slate-300 px-2 py-1 rounded font-black uppercase shrink-0">{p.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 text-center text-[10px] text-slate-400">
              Can't find your printer? Call our helpline.
            </div>
          </div>

        </div>

        {/* STATS STRIP */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-xl" ref={statsRef}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">{c1.toLocaleString()}+</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Printers Set Up</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">{c2}%</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Success Rate</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">24/7</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Helper Availability</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">4.9 ★</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">User Rating</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2026 SmartPrint Portal. All rights reserved. Helpline: +1 (855) 618-4642</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </footer>

      </main>

      {/* MODALS */}
      <Modal isOpen={!!selectedPrinter} onClose={() => setSelectedPrinter(null)} title={selectedPrinter?.name || ""} content={selectedPrinter?.content || ""} />
      <ChatUnavailableModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
