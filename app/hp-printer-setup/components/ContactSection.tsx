"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-hp-light/30 to-hp-blue/10 rounded-3xl p-10 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-hp-blue rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Call Us</p>
                <p className="text-xl font-bold text-gray-900">1-800-HP-PRINT</p>
              </div>
            </div>
            <div className="w-px h-16 bg-gray-300 hidden md:block" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-hp-navy rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Email Us</p>
                <p className="text-xl font-bold text-gray-900">support@hpsetup.com</p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-gray-600">
            Available 24/7 - Friendly support ready to help with all your HP printer needs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
