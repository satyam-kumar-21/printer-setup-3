"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function StartSetup() {
  const [step, setStep] = useState(1);
  const [printerModel, setPrinterModel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [progress, setProgress] = useState(0);
  const [showError, setShowError] = useState(false);

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

  const handleInstall = () => {
    setStep(3);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 12;
      if (currentProgress >= 70) {
        currentProgress = 70;
        clearInterval(interval);
        setTimeout(() => {
          setShowError(true);
        }, 800);
      }
      setProgress(Math.min(currentProgress, 70));
    }, 700);
  };

  const handleRetry = () => {
    setShowError(false);
    setProgress(0);
    setTimeout(handleInstall, 500);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* HP Header */}
      <header className="bg-[#003366] text-white">
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

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-500">
            <Link href="/hp-printer-setup" className="hover:text-gray-700">
              HP Support
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Printer Setup</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-semibold text-[#2D3539] mb-2">
                Select your printer
              </h1>
              <p className="text-[#707372] text-lg">
                Choose your HP printer model to get started with the setup process.
              </p>
            </div>

            {/* Search Box */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <label className="block text-sm font-medium text-[#2D3539] mb-2">
                Search for your printer model
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter your HP printer model (e.g., DeskJet 2700)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0096D6] focus:border-[#0096D6] outline-none transition-all"
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
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setPrinterModel(model)}
                  className={`p-5 rounded-lg border-2 text-left transition-all ${
                    printerModel === model
                      ? "border-[#0096D6] bg-[#E6F4F9]"
                      : "border-gray-200 hover:border-[#0096D6]/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0096D6] to-[#0063A0] rounded-lg flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </div>
                    <span className="font-medium text-[#2D3539]">{model}</span>
                    {printerModel === model && (
                      <div className="ml-auto w-6 h-6 bg-[#0096D6] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                  className="w-full sm:w-auto px-10 py-4 bg-[#0096D6] hover:bg-[#0063A0] text-white font-semibold rounded-lg shadow-md transition-all"
                >
                  Continue
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : step === 2 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-semibold text-[#2D3539] mb-2">
                Download HP Smart
              </h1>
              <p className="text-[#707372] text-lg">
                Get the HP Smart app to complete your printer setup.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#0096D6] to-[#0063A0] rounded-2xl flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#2D3539] mb-3">HP Smart</h2>
              <p className="text-[#707372] mb-8 max-w-2xl mx-auto">
                The HP Smart app helps you set up your printer, scan documents, print from your phone, and much more.
              </p>

              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="px-12 py-4 bg-[#0096D6] hover:bg-[#0063A0] text-white font-semibold rounded-lg shadow-md transition-all text-lg"
                >
                  Download HP Smart
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="text-[#0096D6] hover:text-[#0063A0] font-medium underline transition-colors"
                >
                  Skip for now
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 text-[#2D3539] font-medium rounded-lg hover:bg-gray-50 transition-all"
              >
                Back
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {!showError && progress === 0 ? (
              <div className="text-center space-y-6">
                <div>
                  <h1 className="text-3xl font-semibold text-[#2D3539] mb-2">
                    Install printer software
                  </h1>
                  <p className="text-[#707372] text-lg">
                    Ready to install the software for your {printerModel}
                  </p>
                </div>

                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-[#0096D6]/10 to-[#0063A0]/10 rounded-2xl flex items-center justify-center">
                  <svg className="w-20 h-20 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleInstall}
                    className="px-12 py-4 bg-[#0096D6] hover:bg-[#0063A0] text-white font-semibold rounded-lg shadow-md transition-all text-lg"
                  >
                    Install Software
                  </button>
                  <div className="mt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="text-[#707372] hover:text-[#2D3539] transition-colors"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            ) : !showError ? (
              <div className="text-center space-y-6">
                <div>
                  <h1 className="text-3xl font-semibold text-[#2D3539] mb-2">
                    Installing software...
                  </h1>
                  <p className="text-[#707372] text-lg">
                    This may take a few minutes. Please don't turn off your printer or computer.
                  </p>
                </div>

                <div className="max-w-2xl mx-auto pt-6">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-[#0096D6] to-[#0063A0]"
                    />
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-[#0096D6]">
                    {Math.round(progress)}%
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-3 border-[#0096D6] border-t-transparent rounded-full"
                  />
                  <span className="text-[#707372]">Preparing installation...</span>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8">
                <div className="w-28 h-28 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-14 h-14 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <div>
                  <h1 className="text-3xl font-semibold text-[#2D3539] mb-2">
                    Installation failed
                  </h1>
                  <p className="text-[#707372] text-lg">
                    We encountered an error while installing your {printerModel} software.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-left max-w-2xl mx-auto">
                  <h3 className="font-semibold text-red-800 mb-4 text-lg">Error information</h3>
                  <div className="space-y-2 text-sm text-red-700">
                    <p>
                      <span className="font-medium">Error code:</span> HP_INSTALL_070
                    </p>
                    <p>
                      <span className="font-medium">Description:</span> Failed to download driver package
                    </p>
                    <p>
                      <span className="font-medium">Progress:</span> 70% complete
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={handleRetry}
                    className="px-10 py-4 bg-[#0096D6] hover:bg-[#0063A0] text-white font-semibold rounded-lg shadow-md transition-all"
                  >
                    Retry installation
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-4 border border-gray-300 text-[#2D3539] font-medium rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Start over
                  </button>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto mt-4">
                  <h4 className="font-semibold text-[#2D3539] mb-3 text-lg">Need help?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="w-10 h-10 bg-[#E6F4F9] rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-[#2D3539]">Call support</p>
                        <p className="text-[#707372]">1-800-HP-PRINT</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="w-10 h-10 bg-[#E6F4F9] rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#0096D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-[#2D3539]">Live chat</p>
                        <p className="text-[#707372]">24/7 available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* HP Footer */}
      <footer className="bg-[#2D3539] text-white mt-16">
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
    </div>
  );
}
