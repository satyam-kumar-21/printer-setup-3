"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-hp-blue to-hp-navy">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Set Up Your HP Printer?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Get started today with our comprehensive setup guide and have your printer working in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hp-printer-setup/start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-hp-blue font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Start Setup
              </motion.button>
            </Link>
            <Link href="/hp-printer-setup/start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white/10 transition-all"
              >
                Get Assistance
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
