"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./components/Modal";

export default function Page() {
  const [selectedPrinter, setSelectedPrinter] = useState<{name: string, content: string} | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<{title: string, content: string} | null>(null);

  const printers = [
    {
      name: "HP DeskJet",
      desc: "All-in-one printers for home use",
      content: "HP DeskJet printers are perfect for home use, offering printing, scanning, and copying capabilities. These affordable printers are easy to set up and use, with wireless printing options available on many models. Ideal for everyday printing tasks like homework, documents, and photos.",
    },
    {
      name: "HP ENVY",
      desc: "Premium photo and document printers",
      content: "HP ENVY printers deliver professional-quality prints for both photos and documents. With advanced features like automatic two-sided printing, wireless connectivity, and HP Smart app integration, ENVY printers are perfect for creative projects and home offices.",
    },
    {
      name: "HP OfficeJet",
      desc: "Professional office printers",
      content: "HP OfficeJet printers are designed for small business and home office use. With fast printing speeds, high-capacity ink cartridges, and advanced scanning features, OfficeJet printers help you stay productive and efficient.",
    },
    {
      name: "HP LaserJet",
      desc: "High-speed laser printers",
      content: "HP LaserJet printers offer fast, professional-quality printing with sharp text and graphics. These reliable printers are perfect for busy offices, with options for color printing, wireless connectivity, and high-volume printing.",
    },
    {
      name: "HP Smart Tank",
      desc: "Cost-effective tank printers",
      content: "HP Smart Tank printers feature innovative ink tank technology, delivering thousands of prints at a low cost per page. With easy-to-refill ink tanks and wireless printing, Smart Tank printers are great for high-volume printing needs.",
    },
    {
      name: "HP DesignJet",
      desc: "Large format plotter printers",
      content: "HP DesignJet printers are professional large-format printers perfect for architects, engineers, and designers. Print high-quality blueprints, posters, and banners with exceptional color accuracy and detail.",
    },
  ];

  const issues = [
    {
      title: "HP Printer Offline",
      desc: "Troubleshoot and fix offline printer issues",
      content: "If your HP printer is showing as offline, first check the power and connection cables. Restart both your printer and computer. For wireless printers, verify your Wi-Fi connection. You can also use the HP Print and Scan Doctor tool to diagnose and fix common connectivity problems automatically.",
    },
    {
      title: "HP Printer Not Printing",
      desc: "Resolve printing errors and blank pages",
      content: "If your HP printer won't print, check that there's paper in the tray and that the ink or toner cartridges are not empty. Try printing a test page from the printer's control panel. Restart the print spooler service on your computer, or reinstall the printer drivers if the issue persists.",
    },
    {
      title: "HP Driver Installation Error",
      desc: "Fix driver installation problems",
      content: "Driver installation errors can occur due to corrupted files or system issues. Download the latest drivers from the official HP website, disconnect your printer temporarily, run the installer as administrator, and follow the on-screen instructions carefully.",
    },
    {
      title: "HP Wi-Fi Connection Issues",
      desc: "Resolve wireless connection problems",
      content: "For Wi-Fi connection issues, check your router settings and make sure your printer is within range. Restart your router and printer, then try reconnecting. Use the HP Smart app to guide you through wireless setup and troubleshoot connectivity problems step by step.",
    },
    {
      title: "HP Scanner Not Working",
      desc: "Fix scanner and scanning errors",
      content: "If your HP scanner isn't working, check the USB or wireless connection first. Make sure the scanner software is properly installed. Restart both devices and try scanning using different software (like HP Smart, Windows Scan, or Image Capture on Mac).",
    },
    {
      title: "HP Paper Jam",
      desc: "Clear paper jams safely and easily",
      content: "Paper jams are common and easy to fix. Turn off your printer and unplug it. Gently pull out any jammed paper from the input and output trays, being careful not to tear the paper. Check for any remaining bits of paper inside the printer, then plug it back in and restart.",
    },
    {
      title: "HP Ink Cartridge Error",
      desc: "Resolve cartridge and ink issues",
      content: "Ink cartridge errors can happen if the cartridges are not properly seated, are empty, or are expired. Remove and reinsert the cartridges, check for any protective tape still on them, and try using genuine HP cartridges. You can also run the printer's cleaning cycle to fix quality issues.",
    },
    {
      title: "HP Print Quality Problems",
      desc: "Fix blurry, faded, or streaky prints",
      content: "Poor print quality can be caused by low ink/toner, clogged printheads, or incorrect paper settings. Run the print head cleaning function from the printer's control panel or HP Smart app. Use HP recommended paper for best results.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* HP Header */}
      <header className="bg-[#003366] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/hp-printer-setup" className="flex items-center gap-3">
              <div className="flex items-center">
                <span className="text-2xl font-bold tracking-tight">HP</span>
                <span className="ml-2 text-sm font-medium text-gray-200 hidden sm:block">
                  Support
                </span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-white/90 transition-colors">
                Support Home
              </a>
              <a href="#" className="hover:text-white/90 transition-colors">
                Products
              </a>
              <a href="#" className="hover:text-white/90 transition-colors">
                Drivers & Software
              </a>
              <a href="#" className="hover:text-white/90 transition-colors">
                Contact Us
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#003366] to-[#0063A0] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                HP Printer Setup Made Easy
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Quickly set up your HP printer, install drivers, connect to Wi-Fi, and troubleshoot common issues with our step-by-step guide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/hp-printer-setup/start">
                  <button className="px-10 py-4 bg-white text-[#003366] font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all">
                    Start HP Printer Setup
                  </button>
                </Link>
                <Link href="/hp-printer-setup/start">
                  <button className="px-10 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
                    Get Setup Assistance
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "shield", text: "Secure Setup", desc: "Safe installation" },
              { icon: "check", text: "Easy Installation", desc: "Step-by-step guide" },
              { icon: "wifi", text: "Wireless Printing", desc: "Wi-Fi setup" },
              { icon: "zap", text: "Fast Configuration", desc: "Quick setup" },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[#E6F4F9] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <p className="font-semibold text-[#2D3539] text-lg">{badge.text}</p>
                <p className="text-[#707372] text-sm">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#2D3539] mb-4">HP Printer Setup Guide</h2>
            <p className="text-[#707372] text-lg max-w-2xl mx-auto">
              Follow our comprehensive guide to set up your HP printer successfully
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "download", title: "Download HP Printer Software", desc: "Get the latest HP printer software and drivers from the official HP support website." },
              { icon: "cog", title: "Install Printer Drivers", desc: "Step-by-step instructions to install and configure HP printer drivers on your computer." },
              { icon: "wifi", title: "Connect Printer to Wi-Fi", desc: "Wireless setup for HP printers to connect to your home or office network." },
              { icon: "usb", title: "Connect via USB", desc: "Alternative setup method using USB connection for quick and reliable printing." },
              { icon: "check", title: "Complete First-Time Setup", desc: "Finalize your HP printer configuration and print a test page to verify everything works." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0096D6] to-[#0063A0] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <h3 className="text-xl font-semibold text-[#2D3539] mb-3">{item.title}</h3>
                <p className="text-[#707372]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Printers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#2D3539] mb-4">Supported HP Printer Series</h2>
            <p className="text-[#707372] text-lg max-w-2xl mx-auto">
              Our guide supports all popular HP printer models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {printers.map((printer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-gradient-to-br from-[#E6F4F9] to-white p-8 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#0096D6] to-[#0063A0] rounded-2xl flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2D3539] mb-2">{printer.name}</h3>
                  <p className="text-[#707372] mb-4">{printer.desc}</p>
                  <button
                    onClick={() => setSelectedPrinter(printer)}
                    className="w-full py-3 px-4 text-[#0096D6] font-semibold border-2 border-[#0096D6] rounded-lg hover:bg-[#0096D6] hover:text-white transition-all"
                  >
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#2D3539] mb-4">Common HP Printer Problems</h2>
            <p className="text-[#707372] text-lg max-w-2xl mx-auto">
              Find solutions to the most common HP printer issues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {issues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2D3539] mb-2">{issue.title}</h3>
                <p className="text-[#707372] text-sm mb-4">{issue.desc}</p>
                <button
                  onClick={() => setSelectedIssue(issue)}
                  className="text-[#0096D6] font-semibold text-sm hover:underline flex items-center gap-1"
                >
                  Learn More →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0096D6] to-[#0063A0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Ready to Set Up Your HP Printer?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Get started today with our comprehensive setup guide and have your printer working in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hp-printer-setup/start">
              <button className="px-12 py-4 bg-white text-[#0096D6] font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all">
                Start Setup
              </button>
            </Link>
            <Link href="/hp-printer-setup/start">
              <button className="px-12 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
                Get Assistance
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* HP Footer */}
      <footer className="bg-[#2D3539] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">About HP</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Company</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Support Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Drivers & Downloads</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Printers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Laptops</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Desktops</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">HP Smart</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Virtual Agent</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HP Support Assistant</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 HP Development Company, L.P. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedPrinter && (
        <Modal
          isOpen={!!selectedPrinter}
          onClose={() => setSelectedPrinter(null)}
          title={selectedPrinter.name}
          content={selectedPrinter.content}
        />
      )}
      {selectedIssue && (
        <Modal
          isOpen={!!selectedIssue}
          onClose={() => setSelectedIssue(null)}
          title={selectedIssue.title}
          content={selectedIssue.content}
        />
      )}
    </div>
  );
}
