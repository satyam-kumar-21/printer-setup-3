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
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-white text-slate-800 shadow-xl border border-sky-100"
      >
        {/* Header Section */}
        <div className="bg-sky-50/50 p-6 flex items-center justify-between border-b border-sky-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-sky-955 tracking-tight">{title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <p className="text-slate-650 leading-relaxed text-sm mb-8 font-medium">{content}</p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <Link href="/printer-setup2/start/" className="flex-1 w-full" onClick={onClose}>
              <button className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-full shadow-sm transition-all text-sm">
                Start Setup
              </button>
            </Link>
            <button
              onClick={onClose}
              className="sm:w-32 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-full transition-all text-sm border border-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
