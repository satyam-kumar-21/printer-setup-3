"use client";

import { motion } from "framer-motion";

export default function SetupGuide() {
  const guides = [
    {
      icon: "download",
      title: "Download HP Printer Software",
      description: "Get the latest HP printer software and drivers from the official HP support website.",
    },
    {
      icon: "cog",
      title: "Install Printer Drivers",
      description: "Step-by-step instructions to install and configure HP printer drivers on your computer.",
    },
    {
      icon: "wifi",
      title: "Connect Printer to Wi-Fi",
      description: "Wireless setup for HP printers to connect to your home or office network.",
    },
    {
      icon: "usb",
      title: "Connect via USB",
      description: "Alternative setup method using USB connection for quick and reliable printing.",
    },
    {
      icon: "check-circle",
      title: "Complete First-Time Setup",
      description: "Finalize your HP printer configuration and print a test page to verify everything works.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">HP Printer Setup Guide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our comprehensive guide to set up your HP printer successfully
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-hp-light/30 rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-hp-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-hp-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {guide.icon === "download" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  )}
                  {guide.icon === "cog" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  )}
                  {guide.icon === "wifi" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  )}
                  {guide.icon === "usb" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  )}
                  {guide.icon === "check-circle" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{guide.title}</h3>
              <p className="text-gray-600">{guide.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
