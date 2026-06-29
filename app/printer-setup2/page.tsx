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

/* ── Star Rating ── */
function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < n ? "text-amber-450" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
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
  ];

  const testimonials = [
    { name: "Sarah M.", role: "Home User", stars: 5, text: "Got my DeskJet running in under 5 minutes. The wireless setup guide was crystal clear — I'm not tech-savvy at all but it was so easy!", avatar: "SM" },
    { name: "David R.", role: "Small Business", stars: 5, text: "Had a driver installation error for two days. Called the support line and the technician resolved it in 20 minutes. Absolute lifesavers!", avatar: "DR" },
    { name: "Priya K.", role: "Graphic Designer", stars: 5, text: "Setup my DesignJet for large-format printing seamlessly. The step-by-step guide covered everything. Professional support when I needed it.", avatar: "PK" },
  ];

  const windowsSteps = [
    { n: "01", title: "Download App", desc: "Get the printer app for Windows 10 or 11." },
    { n: "02", title: "Run Setup", desc: "Open the downloaded file and follow the simple steps on your screen." },
    { n: "03", title: "Connect Printer", desc: "Choose Wi-Fi or USB connection. Make sure your PC and printer are on the same network." },
    { n: "04", title: "Print Test Page", desc: "Print a test page to make sure your printer is working." },
  ];

  const macSteps = [
    { n: "01", title: "Open Settings", desc: "Go to the Apple Menu → System Settings → Printers & Scanners." },
    { n: "02", title: "Add Printer", desc: "Click the Add button and select your printer from the list." },
    { n: "03", title: "Install Driver", desc: "Your Mac will automatically download and install the printer driver." },
    { n: "04", title: "Print Test Page", desc: "Set it as your default printer and print a test page." },
  ];

  const filteredPrinters = searchQuery
    ? printers.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : printers;

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#e0f2fe_1.2px,transparent_1.2px)] [background-size:24px_24px] text-slate-800 font-sans antialiased selection:bg-sky-100 flex flex-col lg:flex-row">
      
      {/* LEFT COLUMN - FIXED PANEL */}
      <aside className="w-full lg:w-[420px] bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shrink-0 p-8 lg:p-12 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-between shadow-2xl z-20">
        <div className="space-y-8 lg:space-y-12">
          {/* Logo */}
          <Link href="/printer-setup2" className="flex items-center gap-3 group self-start">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <PrinterIcon />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">PrintAssist</span>
          </Link>

          {/* Hero Heading */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-extrabold uppercase tracking-wider">
              ✨ Simple Setup Portal
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Configure Your Printer <br />
              <span className="text-sky-200">Without Complexity</span>
            </h1>
            <p className="text-sky-100 text-xs sm:text-sm leading-relaxed max-w-md">
              Follow our simple setup guides, browse supported printer models, or troubleshoot connection errors in one simple web utility.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/printer-setup2/start/" className="w-full px-6 py-3.5 bg-white hover:bg-slate-100 text-sky-700 font-bold rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-xs text-center">
              Start Setup
            </Link>
            <button onClick={() => setChatOpen(true)} className="w-full px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold rounded-xl transition-transform hover:-translate-y-0.5 text-xs text-center">
              Chat with Helper
            </button>
          </div>
        </div>

        {/* Helpline Card */}
        <div className="mt-8 lg:mt-0 bg-white/10 border border-white/20 rounded-2xl p-5">
          <span className="text-[9px] font-black text-sky-200 uppercase tracking-widest block mb-1">Toll-Free Helpline</span>
          <p className="text-xl font-black text-white tracking-wider">+1 (855) 618-4642</p>
          <p className="text-[9px] text-sky-150 mt-1.5 font-medium">Available 24/7 for Hardware Setup</p>
        </div>
      </aside>

      {/* RIGHT COLUMN - SCROLLABLE WORKSPACE */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 space-y-12">
        
        {/* SECTION 1: SIDE-BY-SIDE OS SETUP GUIDES */}
        <section id="guides" className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-950/5 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50/40 rounded-full blur-2xl pointer-events-none" />
          
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-sky-600">OS Guidelines</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">How to connect your printer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Windows Column */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="text-xl">🪟</span>
                <h3 className="font-bold text-slate-900 text-sm">Windows Setup (10 & 11)</h3>
              </div>
              <div className="space-y-4">
                {windowsSteps.map((s, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="w-7.5 h-7.5 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 group-hover:bg-sky-600 group-hover:text-white transition-colors">{s.n}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{s.title}</h4>
                      <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* macOS Column */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="text-xl">🍎</span>
                <h3 className="font-bold text-slate-900 text-sm">macOS Setup (Apple Mac)</h3>
              </div>
              <div className="space-y-4">
                {macSteps.map((s, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="w-7.5 h-7.5 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 group-hover:bg-sky-600 group-hover:text-white transition-colors">{s.n}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{s.title}</h4>
                      <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: SUPPORTED PRINTERS GRID */}
        <section id="printers" className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-950/5 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold tracking-widest text-sky-600">Supported Devices</span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Printer Models</h2>
            </div>
            
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search printer models..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-slate-50 border border-sky-150 focus:outline-none focus:border-sky-500 transition-colors"
              />
              <span className="absolute left-3 top-3 text-xs text-slate-400">🔍</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrinters.map((p, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPrinter({ name: p.name, content: printerContents[p.name] })}
                className="p-5 bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-between cursor-pointer transition-all hover:bg-white hover:border-sky-355 hover:shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{p.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{p.name}</h4>
                    <p className="text-slate-400 text-[10px] mt-0.5">{p.desc}</p>
                  </div>
                </div>
                <span className="text-[8px] font-bold bg-white text-slate-400 border border-slate-205 px-2 py-1 rounded-full uppercase shrink-0">{p.tag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: COMMON FIXES ACCORDION LIST */}
        <section id="troubleshoot" className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-950/5 space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-500">Quick Fixes</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">Common Printer Issues</h2>
          </div>

          <div className="space-y-3">
            {issues.map((issue, idx) => {
              const isExpanded = expandedIssue === idx;
              return (
                <div key={idx} className="border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div
                    onClick={() => setExpandedIssue(isExpanded ? null : idx)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{issue.title}</h4>
                      <p className="text-slate-400 text-[10px] mt-0.5">{issue.desc}</p>
                    </div>
                    <span className={`text-sm font-bold text-sky-600 transition-transform ${isExpanded ? "rotate-45" : ""}`}>+</span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-slate-50/30">
                        <div className="px-5 pb-5 pt-2 border-t border-slate-100 text-slate-650 text-xs leading-relaxed font-medium">
                          {issue.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: TRUSTED REVIEWS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white border border-sky-100 rounded-3xl p-6 space-y-6 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-slate-600 text-xs italic font-medium leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs shadow-sm">{t.avatar}</div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">{t.name}</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* SECTION 5: QUICK STATS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center" ref={statsRef}>
          {[
            { val: c1.toLocaleString() + "+", label: "Printers Set Up" },
            { val: c2 + "%", label: "Success Rate" },
            { val: "24/7", label: "Helper Availability" },
            { val: "4.9 ★", label: "User Rating" }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-sky-150 rounded-2xl p-5 shadow-sm">
              <p className="text-lg sm:text-xl font-black text-slate-900">{stat.val}</p>
              <p className="text-[9px] uppercase font-bold text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer className="border-t border-sky-150 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>&copy; 2026 PrintAssist Portal. All rights reserved. Helpline: +1 (855) 618-4642</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-650 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-655 transition-colors">Terms of Service</a>
          </div>
        </footer>

      </main>

      {/* MODALS */}
      <Modal isOpen={!!selectedPrinter} onClose={() => setSelectedPrinter(null)} title={selectedPrinter?.name || ""} content={selectedPrinter?.content || ""} />
      <ChatUnavailableModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
