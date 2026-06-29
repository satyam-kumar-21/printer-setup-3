"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ChatUnavailableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatUnavailableModal({ isOpen, onClose }: ChatUnavailableModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-3xl bg-slate-950 text-slate-100 shadow-2xl overflow-hidden border border-slate-800"
          >
            {/* Header Section */}
            <div className="bg-slate-900 p-6 flex items-center justify-between border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-850 flex items-center justify-center text-blue-450 border border-slate-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">Live Assistance</h2>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950 text-blue-400 border border-blue-900/40 text-[10px] font-bold uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Queue Full
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Live Chat is Offline</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                Our customer setup technicians are currently busy assisting other clients. Please call our toll-free direct support line for immediate assistance.
              </p>

              {/* Phone card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-450 mb-2">Toll-Free Helpline</p>
                <p className="text-2xl font-black text-white tracking-wider">+1 (855) 618-4642</p>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Available 24/7 for Hardware Setup</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <a href="tel:+18556184642" className="flex-1">
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2">
                    Call Helpline
                  </button>
                </a>
                <button onClick={onClose} className="w-24 py-3 bg-transparent hover:bg-slate-900 text-slate-400 hover:text-white font-bold rounded-xl transition-all text-sm border border-slate-800">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
