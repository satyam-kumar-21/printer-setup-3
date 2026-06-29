"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./components/Modal";

export default function Page() {
  const [selectedPrinter, setSelectedPrinter] = useState<{ name: string, content: string } | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<{ title: string, content: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const printers = [
    {
      name: "DeskJet Series",
      desc: "All-in-one printers for everyday home use",
      content: "DeskJet printers are perfect for home use, offering printing, scanning, and copying capabilities. These affordable printers are easy to set up and use, with wireless printing options available on many models. Ideal for everyday printing tasks like homework, documents, and photos.",
    },
    {
      name: "ENVY Photo Series",
      desc: "Premium photo and document printers",
      content: "ENVY printers deliver professional-quality prints for both photos and documents. With advanced features like automatic two-sided printing, wireless connectivity, and smart printer app integration, ENVY printers are perfect for creative projects and home offices.",
    },
    {
      name: "OfficeJet Pro Series",
      desc: "High-performance professional office printers",
      content: "OfficeJet printers are designed for small business and home office use. With fast printing speeds, high-capacity ink cartridges, and advanced scanning features, OfficeJet printers help you stay productive and efficient.",
    },
    {
      name: "LaserJet Pro Series",
      desc: "High-speed professional laser printers",
      content: "LaserJet printers offer fast, professional-quality printing with sharp text and graphics. These reliable printers are perfect for busy offices, with options for color printing, wireless connectivity, and high-volume printing.",
    },
    {
      name: "Smart Tank Series",
      desc: "High-volume, cost-effective tank printers",
      content: "Smart Tank printers feature innovative ink tank technology, delivering thousands of prints at a low cost per page. With easy-to-refill ink tanks and wireless printing, Smart Tank printers are great for high-volume printing needs.",
    },
    {
      name: "DesignJet Series",
      desc: "Large format professional plotter printers",
      content: "DesignJet printers are professional large-format printers perfect for architects, engineers, and designers. Print high-quality blueprints, posters, and banners with exceptional color accuracy and detail.",
    },
  ];

  const issues = [
    {
      title: "Printer Status Offline",
      desc: "Troubleshoot and fix offline printer connectivity issues",
      content: "If your printer is showing as offline, first check the power and connection cables. Restart both your printer and computer. For wireless printers, verify your Wi-Fi connection. You can also use the print diagnostic tool to diagnose and fix common connectivity problems automatically.",
    },
    {
      title: "Printer Not Printing",
      desc: "Resolve printing queue errors and blank page outputs",
      content: "If your printer won't print, check that there's paper in the tray and that the ink or toner cartridges are not empty. Try printing a test page from the printer's control panel. Restart the print spooler service on your computer, or reinstall the printer drivers if the issue persists.",
    },
    {
      title: "Driver Installation Error",
      desc: "Fix software setup and driver installation blocks",
      content: "Driver installation errors can occur due to corrupted files or system issues. Download the latest drivers from the official printer manufacturer website, disconnect your printer temporarily, run the installer as administrator, and follow the on-screen instructions carefully.",
    },
    {
      title: "Wi-Fi Connection Issues",
      desc: "Resolve wireless connection and network discovery problems",
      content: "For Wi-Fi connection issues, check your router settings and make sure your printer is within range. Restart your router and printer, then try reconnecting. Use the smart printer application to guide you through wireless setup and troubleshoot connectivity problems step by step.",
    },
    {
      title: "Scanner Not Functioning",
      desc: "Fix scanning errors and document feeder issues",
      content: "If your scanner isn't working, check the USB or wireless connection first. Make sure the scanner software is properly installed. Restart both devices and try scanning using different software (like the smart printer app, Windows Scan, or Image Capture on Mac).",
    },
    {
      title: "Paper Jam Solutions",
      desc: "Clear paper jams safely from trays and rollers",
      content: "Paper jams are common and easy to fix. Turn off your printer and unplug it. Gently pull out any jammed paper from the input and output trays, being careful not to tear the paper. Check for any remaining bits of paper inside the printer, then plug it back in and restart.",
    },
    {
      title: "Cartridge System Error",
      desc: "Resolve ink cartridge rejection and cartridge errors",
      content: "Ink cartridge errors can happen if the cartridges are not properly seated, are empty, or are expired. Remove and reinsert the cartridges, check for any protective tape still on them, and try using genuine manufacturer cartridges. You can also run the printer's cleaning cycle to fix quality issues.",
    },
    {
      title: "Print Quality Problems",
      desc: "Fix blurry, faded, streaky, or misaligned prints",
      content: "Poor print quality can be caused by low ink/toner, clogged printheads, or incorrect paper settings. Run the print head cleaning function from the printer's control panel or the smart printer app. Use recommended paper for best results.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 antialiased selection:bg-[#0096D6]/20 selection:text-[#0063A0]">


      {/* Brand Header */}
      <header className="bg-[#002244] text-white sticky top-0 z-50 shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/hp-printer-setup/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0096D6] to-[#0063A0] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none">Smart Print</span>
                <span className="text-[10px] text-[#0096D6] font-semibold tracking-wider uppercase mt-0.5">Setup Center</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#setup-guide" className="text-slate-300 hover:text-white transition-colors duration-200">
                Setup Guide
              </a>
              <a href="#supported-printers" className="text-slate-300 hover:text-white transition-colors duration-200">
                Supported Models
              </a>
              <a href="#common-issues" className="text-slate-300 hover:text-white transition-colors duration-200">
                Troubleshooting
              </a>
              <Link href="/hp-printer-setup/start/" className="px-5 py-2 bg-[#0096D6] hover:bg-[#0063A0] text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-[#0096D6]/20">
                Start Setup
              </Link>
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
              className="md:hidden bg-[#001c38] border-t border-white/10 shadow-inner overflow-hidden"
            >
              <div className="px-4 py-5 space-y-4 text-base font-medium">
                <a
                  href="#setup-guide"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Setup Guide
                </a>
                <a
                  href="#supported-printers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Supported Models
                </a>
                <a
                  href="#common-issues"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Troubleshooting
                </a>
                <div className="pt-2 px-3">
                  <Link
                    href="/hp-printer-setup/start/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-3 bg-[#0096D6] hover:bg-[#0063A0] text-white font-semibold rounded-lg shadow-md transition-all"
                  >
                    Start Setup Wizard
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs font-semibold text-slate-400 flex items-center gap-2">
          <span className="hover:text-slate-600 cursor-pointer">Support Portal</span>
          <span>&gt;</span>
          <span className="hover:text-slate-600 cursor-pointer">Hardware Diagnostics</span>
          <span>&gt;</span>
          <span className="text-[#0096D6]">Printer Setup Guide</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#002244] via-[#003366] to-[#005599] text-white overflow-hidden relative mt-4 rounded-b-[2.5rem] shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,150,214,0.15),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Smart Printer Setup <br className="hidden sm:inline" />
                <span className="text-[#0096D6] bg-gradient-to-r from-[#0096D6] to-sky-300 bg-clip-text text-transparent">Made Easy & Fast</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Quickly configure your wireless printer, install necessary software packages, connect to Wi-Fi networks, and resolve driver installation errors seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/hp-printer-setup/start/">
                  <button className="w-full sm:w-auto px-10 py-4 bg-[#0096D6] text-white font-semibold rounded-xl shadow-lg hover:bg-[#0082ba] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                    Start Guided Setup
                  </button>
                </Link>
                <Link href="/hp-printer-setup/start/">
                  <button className="w-full sm:w-auto px-10 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 active:scale-[0.98] transition-all duration-200">
                    Get Support Assistance
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-56 h-56 sm:w-64 sm:h-64 bg-white/5 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl relative"
              >
                <div className="absolute inset-0 bg-[#0096D6] opacity-10 blur-2xl rounded-full" />
                <svg className="w-28 h-28 text-white relative z-10 filter drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-slate-200/80 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: "shield", text: "Secure Setup Assistance", desc: "Safe software installation" },
              { icon: "check", text: "Guided Configuration", desc: "Interactive instructions" },
              { icon: "wifi", text: "Wireless Integration", desc: "Wi-Fi setup & pairing" },
              { icon: "zap", text: "Fast Optimization", desc: "Instant printer readiness" },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="text-center group"
              >
                <div className="w-14 h-14 mx-auto mb-3 bg-[#E6F4F9] rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {badge.icon === "shield" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    )}
                    {badge.icon === "check" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                    {badge.icon === "wifi" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    )}
                    {badge.icon === "zap" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    )}
                  </svg>
                </div>
                <p className="font-semibold text-slate-800 text-base">{badge.text}</p>
                <p className="text-slate-500 text-xs mt-1">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Guide */}
      <section id="setup-guide" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Step-by-Step Printer Setup</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Follow our comprehensive interactive setup instructions to configure your printer correctly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "download", title: "Download Printer Software", desc: "Acquire the latest matching printer software utilities and device drivers for your configuration." },
              { icon: "cog", title: "Install System Drivers", desc: "Follow step-by-step setup guides to install and register compatible printer drivers on your computer." },
              { icon: "wifi", title: "Connect to Wireless Network", desc: "Execute wireless configuration to link your printer device to your local Wi-Fi router smoothly." },
              { icon: "usb", title: "Establish USB Print Path", desc: "Alternative tethered installation using a USB print line for instant hardware initialization." },
              { icon: "check", title: "Verify System Configuration", desc: "Finalize installation, run alignment protocols, and execute a print test page to confirm operation." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-[#0096D6]/30 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#0096D6] to-[#0063A0] rounded-xl flex items-center justify-center mb-6 shadow-md shadow-[#0096D6]/10">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon === "download" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    )}
                    {item.icon === "cog" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    )}
                    {item.icon === "wifi" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    )}
                    {item.icon === "usb" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    )}
                    {item.icon === "check" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Printers */}
      <section id="supported-printers" className="py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#0096D6] text-xs font-bold uppercase tracking-widest bg-[#E6F4F9] px-3.5 py-1.5 rounded-full inline-block mb-3">Model Database</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Supported Printer Series</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Our guides cover setup and driver configuration for all popular printer ranges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {printers.map((printer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl hover:border-[#0096D6]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#E6F4F9] rounded-xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-6 h-6 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 font-semibold px-2 py-0.5 rounded-md tracking-wide uppercase">Active Setup</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{printer.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">{printer.desc}</p>
                </div>
                <button
                  onClick={() => setSelectedPrinter(printer)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#0096D6] hover:text-white bg-[#E6F4F9] hover:bg-[#0096D6] rounded-xl transition-all duration-200 text-center shadow-sm"
                >
                  View Setup Instructions
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section id="common-issues" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-full inline-block mb-3">Diagnostic Desk</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Troubleshooting & Error Correction</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Identify solutions for common connection issues, installation errors, and driver jams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {issues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-xl hover:border-red-200 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group"
                onClick={() => setSelectedIssue(issue)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shadow-inner">
                      <svg className="w-5.5 h-5.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-[9px] text-red-500 font-bold tracking-wider uppercase">Trouble Alert</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug">{issue.title}</h3>
                  <p className="text-slate-500 text-xs mb-4 font-light leading-relaxed">{issue.desc}</p>
                </div>
                <div className="text-[#0096D6] font-semibold text-xs hover:text-[#0063A0] flex items-center gap-1.5 mt-auto pt-2">
                  Troubleshoot Issue
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#002244] to-[#005599] relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,214,0.15),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Need Interactive Calibration Assistance?</h2>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Initialize our automated guided installation wizard to detect system parameters and deploy drivers correctly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hp-printer-setup/start/">
              <button className="w-full sm:w-auto px-10 py-4 bg-[#0096D6] text-white font-semibold rounded-xl shadow-lg hover:bg-[#0082ba] transition-all">
                Run Setup Assistant
              </button>
            </Link>
            <Link href="/hp-printer-setup/start/">
              <button className="w-full sm:w-auto px-10 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                Get Interactive Help
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-white mb-4">Setup Center</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#setup-guide" className="hover:text-white transition-colors">Start Setup Guide</a></li>
                <li><a href="#supported-printers" className="hover:text-white transition-colors">Supported Series</a></li>
                <li><a href="#common-issues" className="hover:text-white transition-colors">Troubleshooting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#common-issues" className="hover:text-white transition-colors">Offline Fixes</a></li>
                <li><a href="#common-issues" className="hover:text-white transition-colors">Driver Problems</a></li>
                <li><a href="#common-issues" className="hover:text-white transition-colors">Print Spooler Reset</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support Tools</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/hp-printer-setup/start/" className="hover:text-white transition-colors">Setup Assistant</Link></li>
                <li><a href="#setup-guide" className="hover:text-white transition-colors">Wi-Fi Connector</a></li>
                <li><a href="#setup-guide" className="hover:text-white transition-colors">Calibration Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">General Info</h4>
              <p className="text-xs leading-relaxed text-slate-500">
                This guided support resource provides generic driver installation tutorials and device Wi-Fi connectivity diagnostics to help configure household printers.
              </p>
            </div>
          </div>

          {/* Detailed Legal Trust Disclaimer */}
          <div className="border-t border-slate-800/80 pt-8 pb-4 text-xs leading-relaxed text-slate-500 space-y-4">
            <p>
              <strong>Disclaimer:</strong> printer-setup-assistant is an independent support information portal offering printer driver configuration tutorials, wireless connection diagnostics, and basic troubleshooting manuals. Any product names, logos, trademarks, and brand series mentioned (including but not limited to HP, DeskJet, ENVY, OfficeJet, LaserJet, and DesignJet) are the properties of their respective copyright and trademark owners. The use of these brand terms and model ranges is purely for informational and descriptive compatibility purposes.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 border-t border-slate-800/40 pt-4">
              <p>© 2026 Printer Setup Assistant. All rights reserved. All trademarks are properties of their respective owners.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedPrinter && (
          <Modal
            isOpen={!!selectedPrinter}
            onClose={() => setSelectedPrinter(null)}
            title={selectedPrinter.name}
            content={selectedPrinter.content}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedIssue && (
          <Modal
            isOpen={!!selectedIssue}
            onClose={() => setSelectedIssue(null)}
            title={selectedIssue.title}
            content={selectedIssue.content}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
