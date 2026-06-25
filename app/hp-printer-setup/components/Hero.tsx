"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-hp-light to-white">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              HP Printer Setup Made Easy
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Quickly set up your HP printer, install drivers, connect to Wi-Fi, and troubleshoot common issues with our step-by-step guide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/hp-printer-setup/start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-hp-blue text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Start HP Printer Setup
                </motion.button>
              </Link>
              <Link href="/hp-printer-setup/start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-hp-blue font-semibold rounded-xl border-2 border-hp-blue hover:bg-hp-light transition-all"
                >
                  Get Setup Assistance
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 glassmorphism"
            >
              <div className="aspect-square bg-gradient-to-br from-hp-blue to-hp-navy rounded-2xl flex items-center justify-center">
                <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
            </motion.div>
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-hp-blue/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-hp-navy/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "shield-check", text: "Secure Setup" },
            { icon: "download", text: "Easy Installation" },
            { icon: "wifi", text: "Wireless Printing" },
            { icon: "zap", text: "Fast Configuration" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-hp-blue/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-hp-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon === "shield-check" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  )}
                  {item.icon === "download" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  )}
                  {item.icon === "wifi" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  )}
                  {item.icon === "zap" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  )}
                </svg>
              </div>
              <p className="font-semibold text-gray-800">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
