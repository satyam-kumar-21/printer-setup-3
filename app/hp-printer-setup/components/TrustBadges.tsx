"use client";

import { motion } from "framer-motion";

export default function TrustBadges() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h3 className="text-lg font-semibold text-gray-500">Trusted by millions of HP printer users worldwide</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {[
            { icon: "shield", text: "Secure", desc: "256-bit Encryption" },
            { icon: "check", text: "Verified", desc: "Official Guide" },
            { icon: "users", text: "10M+", desc: "Happy Users" },
            { icon: "clock", text: "24/7", desc: "Support" },
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-hp-blue/10 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-hp-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {badge.icon === "shield" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  )}
                  {badge.icon === "check" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                  {badge.icon === "users" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  )}
                  {badge.icon === "clock" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
              </div>
              <div className="text-xl font-bold text-gray-900">{badge.text}</div>
              <div className="text-sm text-gray-500">{badge.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
