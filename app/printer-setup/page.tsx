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
        <svg key={i} className={`w-4 h-4 ${i < n ? "text-amber-400" : "text-slate-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Printer icon SVG ── */
function PrinterIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  );
}

export default function Page() {
  const [selectedPrinter, setSelectedPrinter] = useState<{ name: string; content: string } | null>(null);
  const [selectedIssue, setSelectedIssue]   = useState<{ title: string; content: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab]           = useState(0);
  const [scrolled, setScrolled]             = useState(false);
  const [chatOpen, setChatOpen]             = useState(false);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const c1 = useCounter(50000, 2000, statsInView);
  const c2 = useCounter(99,    1800, statsInView);
  const c3 = useCounter(200,   2000, statsInView);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Data ── */
  const printers = [
    { name: "DeskJet Series",      desc: "All-in-one printers for everyday home use",              icon: "🖨️", tag: "Most Popular" },
    { name: "ENVY Photo Series",   desc: "Premium photo and document printing quality",             icon: "📸", tag: "Top Rated"   },
    { name: "OfficeJet Pro Series",desc: "High-performance professional office solution",           icon: "💼", tag: "Business"    },
    { name: "LaserJet Pro Series", desc: "Lightning-fast professional laser printing",              icon: "⚡", tag: "Enterprise"  },
    { name: "Smart Tank Series",   desc: "High-volume, ultra-low cost tank technology",             icon: "🔋", tag: "Best Value"  },
    { name: "DesignJet Series",    desc: "Large format professional plotter precision",             icon: "🗺️", tag: "Pro Design"  },
  ];
  const printerContents: Record<string, string> = {
    "DeskJet Series":       "DeskJet printers are perfect for home use, offering printing, scanning, and copying capabilities. These affordable printers are easy to set up and use, with wireless printing options available on many models. Ideal for everyday printing tasks like homework, documents, and photos.",
    "ENVY Photo Series":    "ENVY printers deliver professional-quality prints for both photos and documents. With advanced features like automatic two-sided printing, wireless connectivity, and smart printer app integration, ENVY printers are perfect for creative projects and home offices.",
    "OfficeJet Pro Series": "OfficeJet printers are designed for small business and home office use. With fast printing speeds, high-capacity ink cartridges, and advanced scanning features, OfficeJet printers help you stay productive and efficient.",
    "LaserJet Pro Series":  "LaserJet printers offer fast, professional-quality printing with sharp text and graphics. These reliable printers are perfect for busy offices, with options for color printing, wireless connectivity, and high-volume printing.",
    "Smart Tank Series":    "Smart Tank printers feature innovative ink tank technology, delivering thousands of prints at a low cost per page. With easy-to-refill ink tanks and wireless printing, Smart Tank printers are great for high-volume printing needs.",
    "DesignJet Series":     "DesignJet printers are professional large-format printers perfect for architects, engineers, and designers. Print high-quality blueprints, posters, and banners with exceptional color accuracy and detail.",
  };

  const issues = [
    { title: "Printer Status Offline",   desc: "Fix offline printer connectivity instantly",         color: "from-rose-500 to-rose-600",    content: "If your printer is showing as offline, first check the power and connection cables. Restart both your printer and computer. For wireless printers, verify your Wi-Fi connection. You can also use the print diagnostic tool to diagnose and fix common connectivity problems automatically." },
    { title: "Printer Not Printing",     desc: "Resolve queue errors and blank page outputs",        color: "from-orange-500 to-red-500",   content: "If your printer won't print, check that there's paper in the tray and that the ink or toner cartridges are not empty. Try printing a test page from the printer's control panel. Restart the print spooler service on your computer, or reinstall the printer drivers if the issue persists." },
    { title: "Driver Installation Error",desc: "Fix software setup and driver install blocks",       color: "from-amber-500 to-orange-500", content: "Driver installation errors can occur due to corrupted files or system issues. Download the latest drivers from the official printer manufacturer website, disconnect your printer temporarily, run the installer as administrator, and follow the on-screen instructions carefully." },
    { title: "Wi-Fi Connection Issues",  desc: "Resolve wireless & network discovery problems",      color: "from-blue-500 to-cyan-600",    content: "For Wi-Fi connection issues, check your router settings and make sure your printer is within range. Restart your router and printer, then try reconnecting. Use the smart printer application to guide you through wireless setup and troubleshoot connectivity problems step by step." },
    { title: "Scanner Not Functioning",  desc: "Fix scanning errors and feeder problems",            color: "from-violet-500 to-purple-600",content: "If your scanner isn't working, check the USB or wireless connection first. Make sure the scanner software is properly installed. Restart both devices and try scanning using different software (like the smart printer app, Windows Scan, or Image Capture on Mac)." },
    { title: "Paper Jam Solutions",      desc: "Clear jams safely from trays and rollers",           color: "from-teal-500 to-cyan-600",    content: "Paper jams are common and easy to fix. Turn off your printer and unplug it. Gently pull out any jammed paper from the input and output trays, being careful not to tear the paper. Check for any remaining bits of paper inside the printer, then plug it back in and restart." },
    { title: "Cartridge System Error",   desc: "Resolve ink cartridge rejection & errors",           color: "from-pink-500 to-rose-600",    content: "Ink cartridge errors can happen if the cartridges are not properly seated, are empty, or are expired. Remove and reinsert the cartridges, check for any protective tape still on them, and try using genuine manufacturer cartridges. You can also run the printer's cleaning cycle to fix quality issues." },
    { title: "Print Quality Problems",   desc: "Fix blurry, faded, streaky or misaligned prints",   color: "from-green-500 to-emerald-600",content: "Poor print quality can be caused by low ink/toner, clogged printheads, or incorrect paper settings. Run the print head cleaning function from the printer's control panel or the smart printer app. Use recommended paper for best results." },
  ];

  const testimonials = [
    { name: "Sarah M.",   role: "Home User",        stars: 5, text: "Got my DeskJet running in under 5 minutes. The wireless setup guide was crystal clear — I'm not tech-savvy at all but it was so easy!", avatar: "SM" },
    { name: "David R.",   role: "Small Business",   stars: 5, text: "Had a driver installation error for two days. Called the support line and the technician resolved it in 20 minutes. Absolute lifesavers!", avatar: "DR" },
    { name: "Priya K.",   role: "Graphic Designer", stars: 5, text: "Setup my DesignJet for large-format printing seamlessly. The step-by-step guide covered everything. Professional support when I needed it.", avatar: "PK" },
    { name: "James T.",   role: "IT Manager",       stars: 5, text: "Deployed 12 LaserJets across our office. This setup center made the process systematic and fast. Highly recommend for bulk deployments.", avatar: "JT" },
    { name: "Linda C.",   role: "Freelancer",       stars: 5, text: "Scanner wasn't working for weeks. Found this site, followed the troubleshooting guide, and had a live chat that fixed everything. 10/10!", avatar: "LC" },
    { name: "Mike P.",    role: "Home Office",      stars: 5, text: "The Wi-Fi connection guide solved my connectivity issue instantly. Would have taken me hours without this resource.", avatar: "MP" },
  ];

  const setupTabs = [
    {
      label: "Windows",
      icon: "🪟",
      steps: [
        { n: "01", title: "Download Smart App",     desc: "Get the latest printer Smart application from the official source compatible with Windows 10 & 11." },
        { n: "02", title: "Run the Installer",          desc: "Launch the downloaded .exe file as Administrator and follow the on-screen setup wizard." },
        { n: "03", title: "Select Connection Type",     desc: "Choose Wi-Fi or USB connection. For Wi-Fi, ensure your printer and computer are on the same network." },
        { n: "04", title: "Print Alignment Page",       desc: "Complete setup by printing a test alignment page to confirm driver and connection are working." },
      ],
    },
    {
      label: "Mac / macOS",
      icon: "🍎",
      steps: [
        { n: "01", title: "Open System Preferences",   desc: "Navigate to Apple Menu → System Preferences → Printers & Scanners on your Mac." },
        { n: "02", title: "Add Printer",                desc: "Click the + button and select your printer from the discovered devices list." },
        { n: "03", title: "Install macOS Driver",       desc: "macOS will automatically download and install the correct AirPrint or print driver package." },
        { n: "04", title: "Verify and Test Print",      desc: "Set as default printer and print a test document to confirm the installation is complete." },
      ],
    },
    {
      label: "Mobile / iOS",
      icon: "📱",
      steps: [
        { n: "01", title: "Install Smart App",       desc: "Download the free printer Smart app from the Apple App Store or Google Play Store on your device." },
        { n: "02", title: "Open and Sign In",           desc: "Launch the Smart app, create a free account or sign in to access all printer management features." },
        { n: "03", title: "Add Your Printer",           desc: "Tap the + icon to add your printer. The app will scan your network and detect available printer models." },
        { n: "04", title: "Start Printing Wirelessly",  desc: "Print photos, documents, and web pages directly from your phone with zero configuration needed." },
      ],
    },
  ];

  const navLinks = [
    { label: "Setup Guide",      href: "#setup-guide" },
    { label: "Printers",         href: "#supported-printers" },
    { label: "Troubleshooting",  href: "#common-issues" },
    { label: "Reviews",          href: "#testimonials" },
  ];

  return (
    <div className="min-h-screen hp-bg dot-grid text-slate-800 antialiased overflow-x-hidden">

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-md" : "bg-transparent border-b border-slate-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/printer-setup/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0096D6] to-[#0063A0] flex items-center justify-center shadow-lg shadow-[#0096D6]/30 group-hover:scale-105 transition-transform duration-300">
                  <PrinterIcon className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <div className="text-base font-black text-slate-900 leading-none tracking-tight">Smart Print</div>
                <div className="text-[10px] text-[#0096D6] font-bold uppercase tracking-widest mt-0.5">Setup Center</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href}
                  className="text-slate-600 hover:text-[#0096D6] transition-colors duration-200 relative group py-1">
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#0096D6] group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
              ))}
              <Link href="/printer-setup/start/"
                className="btn-hp px-5 py-2.5 text-sm inline-block text-center">
                Start Setup
              </Link>
            </nav>

            {/* Mobile toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}
              className="md:hidden overflow-hidden glass border-t border-slate-200">
              <div className="px-4 py-5 space-y-1">
                {navLinks.map((item) => (
                  <a key={item.label} href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 px-4 rounded-xl text-slate-700 hover:text-[#0096D6] hover:bg-slate-50 transition-all font-medium">
                    {item.label}
                  </a>
                ))}
                <div className="pt-2">
                  <Link href="/printer-setup/start/" onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-3 btn-hp rounded-xl font-bold">
                    Start Setup Wizard
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 mb-2">
        <nav className="text-xs font-semibold text-slate-500 flex items-center flex-wrap gap-3">
          <span className="hover:text-slate-800 cursor-pointer transition-colors">Support Portal</span>
          <svg className="w-3 h-3 text-slate-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          <span className="hover:text-slate-800 cursor-pointer transition-colors">Hardware Diagnostics</span>
          <svg className="w-3 h-3 text-slate-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          <span className="text-[#0096D6]">Printer Setup Guide</span>
        </nav>
      </div>

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-gradient-to-b from-[#f0f7ff] via-[#ffffff] to-[#ffffff]">
        {/* Decorative background ambient blobs */}
        <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Column (Content) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }} 
              className="lg:col-span-7 space-y-8 text-center lg:text-left"
            >
              <div className="section-label">
                <span className="w-2 h-2 rounded-full bg-[#0096D6] animate-ping" />
                Smart Connection Active
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black leading-[1.05] tracking-tight text-slate-950">
                Setup Your Printer<br />
                <span className="hp-gradient-text">Without The Headache</span>
              </h1>

              <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Our secure automated diagnostic wizard configures Wi-Fi connectivity, installs correct driver packages, and resolves offline errors instantly.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/printer-setup/start/">
                  <button className="btn-hp w-full sm:w-auto px-8 py-4 text-base rounded-2xl flex items-center justify-center gap-3 group">
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Start Guided Setup Wizard
                  </button>
                </Link>
                <Link href="/printer-setup/start/">
                  <button className="btn-outline w-full sm:w-auto px-8 py-4 text-base rounded-2xl flex items-center justify-center gap-2">
                    💬 Connect With Support
                  </button>
                </Link>
              </div>

              {/* Security Badges */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center pt-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm">
                  🛡️ Secure SSL Config
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm">
                  ⚡ Auto-Detection
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm">
                  📞 24/7 Helpline
                </span>
              </div>
            </motion.div>

            {/* Right Column (Cool Dashboard Visual) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[400px]">
                {/* Visual Glow Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0096D6]/10 to-cyan-400/5 rounded-[2.5rem] blur-xl pointer-events-none" />

                {/* Dashboard Card Container */}
                <div className="relative bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-2xl overflow-hidden">
                  
                  {/* Decorative Scan Ring Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">Live Setup Monitor</span>
                    </div>
                    <span className="text-[10px] bg-blue-50 text-[#0063A0] font-black px-2.5 py-1 rounded-full uppercase">Network Active</span>
                  </div>

                  {/* Printer Hub Visual */}
                  <div className="flex justify-center items-center py-8 relative">
                    {/* Ring scan animations */}
                    <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#0096D6]/20 spin-slow" />
                    <div className="absolute w-36 h-36 rounded-full border border-slate-200/50 spin-rev" />
                    <div className="absolute w-28 h-28 rounded-full border border-[#0096D6]/15 scanner-ring" />
                    
                    {/* Floating Center Device Card */}
                    <div className="relative z-10 w-24 h-24 rounded-2xl bg-[#e6f4f9] border border-blue-100 flex items-center justify-center float-anim shadow-md">
                      <PrinterIcon className="w-10 h-10 text-[#0096D6]" />
                    </div>
                  </div>

                  {/* Telemetry Checkpoints */}
                  <div className="space-y-3 mt-4">
                    {[
                      { title: "System Port Diagnostics", desc: "Checking connection lines...", status: "Ready", color: "text-[#0096D6]" },
                      { title: "Driver Package Locator", desc: "Verifying driver matching database...", status: "Pass", color: "text-emerald-600" },
                      { title: "Wi-Fi Router Verification", desc: "Analyzing setup connection route...", status: "Online", color: "text-[#0096D6]" },
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                        <div>
                          <div className="font-bold text-slate-800">{step.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{step.desc}</div>
                        </div>
                        <span className={`font-black uppercase tracking-wider text-[10px] ${step.color}`}>{step.status}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Floating pill indicators */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-white border border-slate-200 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg text-xs font-bold text-slate-800"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Auto-Detecting...
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 bg-white border border-slate-200 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg text-xs font-bold text-[#0096D6]"
                >
                  📡 Wi-Fi 5Ghz Connected
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════ */}
      <section className="border-y border-slate-200/80 bg-slate-50/50">
        <div ref={statsRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: c1.toLocaleString() + "+", label: "Setups Completed", icon: "🖨️" },
              { value: c2 + "%",                   label: "Resolution Rate",   icon: "✅" },
              { value: c3 + "+",                   label: "Models Covered",    icon: "📋" },
              { value: "4.9 ★",                    label: "Average Rating",    icon: "⭐" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center glass-card rounded-2xl p-6">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-3xl font-black hp-gradient-text">{s.value}</div>
                <div className="text-slate-500 text-xs font-bold mt-1.5 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label mx-auto mb-4">🚀 How It Works</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Get Your Printer Running in Minutes</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Three simple steps from unboxing to printing — no technical expertise required.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              { step: "01", icon: "🔍", title: "Identify Your Model",   desc: "Select your printer model from our complete database of 200+ supported devices across all popular series lines.", color: "#0096D6" },
              { step: "02", icon: "⬇️", title: "Download & Configure", desc: "We'll guide you to install the perfect driver package and configure all wireless and USB connection settings.", color: "#0063A0" },
              { step: "03", icon: "✅", title: "Print & Verify",        desc: "Run a test print to confirm everything is working perfectly. Our experts are standing by if you hit any issues.", color: "#004882" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.15 }}
                className="relative glass-card rounded-3xl p-8 overflow-hidden text-center group">
                <div className="step-num">{item.step}</div>
                {/* Connector line (desktop) */}
                {i < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
                <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-[#0096D6] uppercase tracking-widest mb-2">Step {item.step}</div>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#0096D6] transition-colors duration-200">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SETUP GUIDE (Windows/Mac/Mobile)
      ══════════════════════════════════════════ */}
      <section id="setup-guide" className="py-24 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label mx-auto mb-4">⚙️ Setup Guide</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Step-by-Step Installation Guide</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Tailored instructions for every platform — Windows, Mac, or mobile.</p>
          </div>

          {/* Tab selector */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex gap-1 p-1.5 rounded-2xl bg-white border border-slate-200">
              {setupTabs.map((tab, i) => (
                <button key={i} onClick={() => setActiveTab(i)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${activeTab === i
                    ? "bg-[#0096D6] text-white shadow-md"
                    : "text-slate-600 hover:text-slate-950"
                  }`}>
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {setupTabs[activeTab].steps.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-7 flex gap-5 group">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-lg font-black text-white shadow-md bg-gradient-to-br from-[#0096D6] to-[#0063A0]">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#0096D6] transition-colors">{s.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-10">
            <Link href="/printer-setup/start/">
              <button className="btn-hp px-8 py-4 rounded-xl text-base inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Launch Interactive Wizard
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SUPPORTED PRINTERS
      ══════════════════════════════════════════ */}
      <section id="supported-printers" className="py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label mx-auto mb-4">🖨️ Model Database</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Supported Printer Series</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Complete setup and driver support for all major printer families.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {printers.map((printer, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 bg-[#e6f4f9] border border-blue-100">
                      {printer.icon}
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100">
                      {printer.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-[#0096D6] transition-colors duration-200">{printer.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{printer.desc}</p>
                </div>
                <button onClick={() => setSelectedPrinter({ name: printer.name, content: printerContents[printer.name] })}
                  className="w-full py-2.5 px-4 text-sm font-bold rounded-xl transition-all duration-200"
                  style={{ color: "#0096D6", background: "rgba(0,150,214,0.06)", border: "1px solid rgba(0,150,214,0.15)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#0096D6"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,150,214,0.06)"; (e.currentTarget as HTMLButtonElement).style.color = "#0096D6"; }}>
                  View Setup Instructions →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMMON ISSUES / TROUBLESHOOTING
      ══════════════════════════════════════════ */}
      <section id="common-issues" className="py-24 border-t border-slate-100 bg-slate-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label mx-auto mb-4 !text-rose-600 !bg-rose-50 !border-rose-100">
              🔧 Diagnostic Desk
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Common Issues & Instant Fixes</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Click any issue below to get an immediate resolution guide — or contact our live support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {issues.map((issue, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass-card rounded-2xl p-5 cursor-pointer flex flex-col group"
                onClick={() => setSelectedIssue(issue)}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${issue.color} flex items-center justify-center mb-4 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-1.5 leading-snug group-hover:text-[#0096D6] transition-colors">{issue.title}</h3>
                <p className="text-slate-500 text-xs mb-4 leading-relaxed flex-1">{issue.desc}</p>
                <div className="text-[#0096D6] font-bold text-xs flex items-center gap-1.5 mt-auto group-hover:gap-2.5 transition-all">
                  Fix This Issue
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Urgent support callout */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 rounded-3xl p-8 text-center relative overflow-hidden bg-rose-50/50 border border-rose-100">
            <div className="relative z-10">
              <div className="text-3xl mb-3">🚨</div>
              <h3 className="text-xl font-black text-slate-950 mb-2">Can&apos;t Find Your Issue?</h3>
              <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">Our certified technicians are available 24/7 to diagnose and resolve any printer problem remotely.</p>
              <button onClick={() => setChatOpen(true)} className="btn-hp px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Chat with a Technician Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section className="py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="section-label mb-6">💡 Why Choose Us</div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-6 leading-tight">
                Expert Printer Support{" "}
                <span className="hp-gradient-text">You Can Trust</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We&apos;ve helped thousands of printer users get up and running. Our certified technicians know every printer model inside out.
              </p>

              <div className="space-y-4">
                {[
                  { icon: "🛡️", title: "Certified Technicians",    desc: "All support agents are certified with years of hands-on printer setup expertise." },
                  { icon: "⚡", title: "Instant Remote Diagnosis", desc: "Our tools can detect printer issues and push fixes remotely in minutes." },
                  { icon: "🕐", title: "24/7 Live Support",        desc: "Reach us any time — day or night. Printers don't keep business hours." },
                  { icon: "🔒", title: "100% Secure Sessions",     desc: "All remote sessions are encrypted and require your explicit permission." },
                ].map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start p-4 rounded-2xl transition-all duration-200 hover:bg-[#0096D6]/5 group cursor-default">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-xl bg-[#e6f4f9] border border-blue-100">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-950 text-sm mb-0.5 group-hover:text-[#0096D6] transition-colors">{f.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — support card */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="rounded-3xl p-8 relative overflow-hidden bg-gradient-to-br from-[#002244] to-[#0063A0] text-white">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-blue-200 font-semibold uppercase tracking-wider">Toll-Free Helpline</div>
                      <div className="text-xl font-black text-white">+1 (855) 618-4642</div>
                    </div>
                  </div>

                  <div className="h-px bg-white/15 mb-6" />

                  <div className="space-y-3 mb-6">
                    {[
                      { label: "Average response time", value: "< 3 minutes" },
                      { label: "First-call resolution",  value: "94%" },
                      { label: "Customer satisfaction",  value: "4.9 / 5.0" },
                    ].map((m) => (
                      <div key={m.label} className="flex items-center justify-between">
                        <span className="text-blue-100 text-sm">{m.label}</span>
                        <span className="text-[#00c4f4] font-black text-sm">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setChatOpen(true)} className="w-full py-4 rounded-xl text-base font-black bg-[#0096D6] hover:bg-[#007cb3] transition-colors text-white shadow-lg">
                    💬 Start Live Chat Now
                  </button>
                  <p className="text-center text-blue-200/60 text-xs mt-3">Available Mon–Sun · 7AM – 11PM EST</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label mx-auto mb-4">⭐ Customer Reviews</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-4">Thousands of Happy Users</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Real experiences from people who got their printers working with our help.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="testimonial-card p-6">
                <Stars n={t.stars} />
                <p className="text-slate-600 text-sm leading-relaxed my-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 bg-gradient-to-br from-[#0096D6] to-[#004882]">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold text-sm">{t.name}</div>
                    <div className="text-slate-400 text-xs">{t.role}</div>
                  </div>
                  <div className="ml-auto">
                    <svg className="w-5 h-5 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#002244] to-[#0063A0] text-white">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", transform: "translate(-40%, -40%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,150,214,0.2) 0%, transparent 70%)", transform: "translate(40%, 40%)" }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="section-label mx-auto mb-6 !text-white !bg-white/10 !border-white/20">🤝 Get Expert Help</div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Printer Still Not Working?<br />
              <span className="text-[#00c4f4]">We&apos;ll Fix It Right Now.</span>
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Don&apos;t waste hours troubleshooting alone. Our certified technicians will remotely diagnose and resolve your printer issue in minutes — guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/printer-setup/start/">
                <button className="w-full sm:w-auto px-10 py-4 bg-white text-[#002244] font-black rounded-xl shadow-2xl hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200 text-base">
                  🚀 Run Setup Assistant
                </button>
              </Link>
              <button onClick={() => setChatOpen(true)} className="w-full sm:w-auto px-10 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/60 transition-all duration-200 text-base">
                💬 Chat With Expert
              </button>
            </div>

            <p className="text-blue-200 text-sm font-semibold">
              📞 Call toll-free: <span className="font-black text-white text-base ml-1">+1 (855) 618-4642</span> — Available 24/7
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0096D6] to-[#004882] flex items-center justify-center">
                  <PrinterIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">Smart Print</div>
                  <div className="text-[9px] text-[#0096D6] font-bold uppercase tracking-widest">Setup Center</div>
                </div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">Expert printer setup, driver installation, and troubleshooting support for home and office users.</p>
            </div>

            {[
              { title: "Setup Center", links: [{ label: "Start Setup Guide", href: "#setup-guide" }, { label: "Supported Series", href: "#supported-printers" }, { label: "Troubleshooting", href: "#common-issues" }] },
              { title: "Quick Fixes",  links: [{ label: "Printer Offline Fix", href: "#common-issues" }, { label: "Driver Problems", href: "#common-issues" }, { label: "Wi-Fi Setup Guide", href: "#common-issues" }] },
              { title: "Support",      links: [{ label: "Live Chat Support", href: "/printer-setup/start/" }, { label: "Call Helpline", href: "#" }, { label: "Remote Diagnosis", href: "/printer-setup/start/" }] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-slate-500 hover:text-[#0096D6] transition-colors text-sm font-medium">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="h-px bg-slate-200 mb-8" />

          <div className="text-xs text-slate-400 leading-relaxed mb-6">
            <strong className="text-slate-500">Disclaimer:</strong> printer-setup-assistant is an independent support information portal offering printer driver configuration tutorials, wireless connection diagnostics, and troubleshooting manuals. Brand names, logos, and product series mentioned are properties of their respective trademark owners. Use of brand terms is for informational compatibility purposes only.
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
            <p>© 2026 Printer Setup Assistant. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#0096D6] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#0096D6] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#0096D6] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {selectedPrinter && (
          <Modal isOpen={!!selectedPrinter} onClose={() => setSelectedPrinter(null)}
            title={selectedPrinter.name} content={selectedPrinter.content} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedIssue && (
          <Modal isOpen={!!selectedIssue} onClose={() => setSelectedIssue(null)}
            title={selectedIssue.title} content={selectedIssue.content} />
        )}
      </AnimatePresence>
      <ChatUnavailableModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
