"use client";

import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const reasons = [
    { icon: "check", title: "Step-by-Step Instructions" },
    { icon: "user", title: "Beginner Friendly" },
    { icon: "shield", title: "Secure Driver Guidance" },
    { icon: "wifi", title: "Wireless Setup Support" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-hp-light/30 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose This Guide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The most reliable and comprehensive HP printer setup guide available
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-8 shadow-xl text-center border border-gray-100"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-hp-blue rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {reason.icon === "check" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  )}
                  {reason.icon === "user" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  )}
                  {reason.icon === "shield" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  )}
                  {reason.icon === "wifi" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  )}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{reason.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
