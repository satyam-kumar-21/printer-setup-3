"use client";

import { motion } from "framer-motion";

export default function SetupSteps() {
  const steps = [
    { step: 1, title: "Unbox Printer", desc: "Remove all packaging materials and accessories" },
    { step: 2, title: "Power On Device", desc: "Plug in and turn on your HP printer" },
    { step: 3, title: "Connect to Wi-Fi", desc: "Connect your printer to your wireless network" },
    { step: 4, title: "Install HP Drivers", desc: "Download and install the latest HP software" },
    { step: 5, title: "Print Test Page", desc: "Verify everything works with a test print" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">HP Printer Setup Steps</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow these simple steps to set up your HP printer in minutes
          </p>
        </motion.div>
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-hp-blue/20 -translate-x-1/2" />
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1" />
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 bg-gradient-to-br from-hp-blue to-hp-navy rounded-full flex items-center justify-center shadow-xl text-white text-2xl font-bold"
                  >
                    {step.step}
                  </motion.div>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-white to-hp-light/30 rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
