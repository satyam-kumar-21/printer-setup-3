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
        <svg key={i} className={`w-4 h-4 ${i < n ? "text-amber-500" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
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
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#e0f2fe_1.2px,transparent_1.2px)] [background-size:24px_24px] text-slate-800 font-sans antialiased selection:bg-sky-100 flex flex-col justify-between">
      
      <div>
        {/* FLOATING PILL HEADER */}
        <div className="px-6 pt-6 sticky top-0 z-50">
          <header className="max-w-6xl mx-auto h-16 px-6 rounded-2xl bg-white/90 backdrop-blur-md border border-sky-150 shadow-md flex items-center justify-between">
            <Link href="/printer-setup2" className="flex items-center gap-2.5 group">
              <div className="w-8.5 h-8.5 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm shadow-sky-500/20">
                <PrinterIcon />
              </div>
              <span className="text-base font-bold tracking-tight text-slate-900">PrintAssist</span>
            </Link>

            <nav className="flex items-center gap-6 text-xs font-bold">
              <a href="#guides" className="text-slate-500 hover:text-sky-600 transition-colors">Setup Guides</a>
              <a href="#printers" className="text-slate-500 hover:text-sky-600 transition-colors">Supported Printers</a>
              <a href="#troubleshoot" className="text-slate-500 hover:text-sky-600 transition-colors">Troubleshoot</a>
              <Link href="/printer-setup2/start/" className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl transition-all text-xs font-bold shadow-md shadow-sky-500/10">
                Start Setup
              </Link>
            </nav>
          </header>
        </div>

        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-xs font-bold text-sky-700">
            ✨ Simple Setup Portal
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Configure Your Printer & Drivers <br />
            <span className="text-sky-600">Without The Complexity</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Follow our simple setup guides below, browse supported printer models, or troubleshoot connection errors in one simple web utility.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/printer-setup2/start/" className="w-full sm:w-auto px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition-all text-sm text-center">
              Start Setup Wizard
            </Link>
            <button onClick={() => setChatOpen(true)} className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl shadow-sm transition-all text-sm text-center">
              Chat with Helper
            </button>
          </div>
        </section>

        {/* SECTION 1: SIDE-BY-SIDE OS SETUP GUIDES */}
        <section id="guides" className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-sky-600">OS Guidelines</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">How to connect your printer</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Windows Column */}
            <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-950/5 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="text-2xl">🪟</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Windows Setup</h3>
                  <p className="text-slate-400 text-xs">Steps for Windows 10 & 11</p>
                </div>
              </div>
              <div className="space-y-4">
                {windowsSteps.map((s, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">{s.n}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{s.title}</h4>
                      <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* macOS Column */}
            <div className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-950/5 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="text-2xl">🍎</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">macOS Setup</h3>
                  <p className="text-slate-400 text-xs">Steps for Apple Mac systems</p>
                </div>
              </div>
              <div className="space-y-4">
                {macSteps.map((s, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">{s.n}</div>
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
        <section id="printers" className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase font-extrabold tracking-widest text-sky-600">Supported Devices</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Printer Models</h2>
            </div>
            
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search printer models..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-white border border-sky-150 focus:outline-none focus:border-sky-500 transition-colors shadow-sm"
              />
              <span className="absolute left-3 top-3 text-xs text-slate-400">🔍</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrinters.map((p, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPrinter({ name: p.name, content: printerContents[p.name] })}
                className="p-6 bg-white border border-sky-100 rounded-3xl flex items-center justify-between cursor-pointer transition-all hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/5 group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl shrink-0">{p.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{p.name}</h4>
                    <p className="text-slate-400 text-xs mt-0.5">{p.desc}</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold bg-sky-50 text-sky-700 border border-sky-100 px-2.5 py-1 rounded-full uppercase shrink-0">{p.tag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: COMMON FIXES ACCORDION LIST */}
        <section id="troubleshoot" className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-500">Quick Fixes</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Common Printer Issues</h2>
          </div>

          <div className="space-y-4">
            {issues.map((issue, idx) => {
              const isExpanded = expandedIssue === idx;
              return (
                <div key={idx} className="bg-white border border-sky-100 rounded-3xl overflow-hidden shadow-sm">
                  <div
                    onClick={() => setExpandedIssue(isExpanded ? null : idx)}
                    className="p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">{issue.title}</h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">{issue.desc}</p>
                    </div>
                    <span className={`text-lg font-bold text-sky-600 transition-transform ${isExpanded ? "rotate-45" : ""}`}>+</span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-slate-50/30">
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-slate-600 text-xs leading-relaxed font-medium">
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
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Trusted Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
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
          </div>
        </section>

        {/* SECTION 5: STATS STRIP & HELPLINE */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center" ref={statsRef}>
            {[
              { val: c1.toLocaleString() + "+", label: "Printers Set Up" },
              { val: c2 + "%", label: "Success Rate" },
              { val: "24/7", label: "Helper Availability" },
              { val: "4.9 ★", label: "User Rating" }
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-sky-100/60 rounded-2xl p-5 shadow-sm">
                <p className="text-xl sm:text-2xl font-black text-slate-900">{stat.val}</p>
                <p className="text-[9px] uppercase font-bold text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Helpline Alert Panel */}
          <div className="mt-8 rounded-3xl p-6 sm:p-8 bg-sky-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-sky-600/10">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-bold text-lg">Still need help setting up?</h3>
              <p className="text-sky-100 text-xs">Call our helpline to set up your printer drivers easily.</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right hidden sm:block">
                <span className="text-[9px] uppercase tracking-widest text-sky-200 block">Toll-Free Helpline</span>
                <span className="text-lg font-black tracking-wider">+1 (855) 618-4642</span>
              </div>
              <a href="tel:+18556184642" className="px-6 py-3 bg-white hover:bg-sky-50 text-sky-600 font-bold rounded-full transition-all text-xs shadow-sm">
                Call Helpline
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 pt-16 pb-8 text-slate-400 text-xs px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-8.5 h-8.5 rounded-xl bg-sky-600 flex items-center justify-center text-white"><PrinterIcon /></span>
                <span className="text-base font-bold text-white">PrintAssist</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Troubleshooting and setup helpers to synchronize your printer drivers easily.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-[10px]">Links</h4>
              <ul className="space-y-2 font-semibold">
                <li><a href="#guides" className="hover:text-white transition-colors">Setup Guides</a></li>
                <li><a href="#printers" className="hover:text-white transition-colors">Printers List</a></li>
                <li><a href="#troubleshoot" className="hover:text-white transition-colors">Troubleshoot</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-[10px]">Direct Helpline</h4>
              <ul className="space-y-2 font-semibold">
                <li className="text-white font-bold flex items-center gap-1">
                  <span>📞</span> +1 (855) 618-4642
                </li>
                <li>
                  <button onClick={() => setChatOpen(true)} className="hover:text-white transition-colors">
                    💬 Support Chat
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold text-slate-500">
            <p>&copy; 2026 PrintAssist Portal. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <Modal isOpen={!!selectedPrinter} onClose={() => setSelectedPrinter(null)} title={selectedPrinter?.name || ""} content={selectedPrinter?.content || ""} />
      <ChatUnavailableModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
