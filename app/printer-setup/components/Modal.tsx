"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function Modal({ isOpen, onClose, title, content }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 shadow-2xl"
        style={{
          boxShadow: "0 20px 50px rgba(0,0,0,0.15), 0 0 30px rgba(0,150,214,0.05)",
        }}
      >
        {/* Top gradient accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#0096D6] to-[#0063A0] rounded-t-3xl" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0096D6] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="ml-4 w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-6" />

          {/* Content */}
          <p className="text-slate-600 leading-relaxed text-base mb-8">{content}</p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/printer-setup/start/" className="flex-1 w-full" onClick={onClose}>
              <button className="w-full py-3.5 btn-hp text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2">
                🚀 Launch Setup Wizard
              </button>
            </Link>
            <button
              onClick={onClose}
              className="sm:w-28 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all text-sm border border-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
