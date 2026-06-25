"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/hp-printer-setup" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-hp-blue to-hp-navy rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">HP</span>
            </motion.div>
            <div>
              <span className="text-xl font-bold text-gray-900">Printer Setup</span>
              <span className="text-sm text-gray-500 block">Official Setup Guide</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/hp-printer-setup" className="text-gray-700 hover:text-hp-blue font-medium transition-colors">
              Home
            </Link>
            <Link href="/hp-printer-setup" className="text-gray-700 hover:text-hp-blue font-medium transition-colors">
              Setup Guide
            </Link>
            <Link href="/hp-printer-setup" className="text-gray-700 hover:text-hp-blue font-medium transition-colors">
              Troubleshooting
            </Link>
            <Link href="/hp-printer-setup/start" className="px-5 py-2 bg-hp-blue text-white font-semibold rounded-xl hover:bg-hp-navy transition-colors">
              Start Setup
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
