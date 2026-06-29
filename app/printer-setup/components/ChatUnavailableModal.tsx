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
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
            style={{ border: "1px solid #e2e8f0" }}
          >
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0096D6] to-[#0063A0]" />

            <div className="p-8 text-center">
              {/* Icon */}
              <div className="w-18 h-18 mx-auto w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6 shadow-inner">
                <span className="text-3xl">💬</span>
              </div>

              {/* Status dot + label */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Chat Offline</span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 mb-3 leading-tight">
                Live Chat is Not Available Right Now
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Our chat agents are currently offline. You can reach us immediately by phone — our helpline is available 7 days a week.
              </p>

              {/* Phone card */}
              <div className="rounded-2xl p-5 mb-6 text-center"
                style={{ background: "linear-gradient(135deg, #002244, #0063A0)", color: "#fff" }}>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">📞 Toll-Free Helpline</p>
                <p className="text-2xl font-black tracking-wide">+1 (855) 618-4642</p>
                <p className="text-xs text-blue-200 mt-1">Available Mon – Sun · 7AM – 11PM EST</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <a href="tel:+18556184642" className="flex-1">
                  <button className="w-full py-3.5 btn-hp text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2">
                    📞 Call Now
                  </button>
                </a>
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
      )}
    </AnimatePresence>
  );
}
