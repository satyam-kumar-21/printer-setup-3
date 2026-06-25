"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I set up my HP printer?",
      answer: "Follow our step-by-step guide: unbox your printer, power it on, connect to Wi-Fi, install HP drivers, and print a test page to verify everything works.",
    },
    {
      question: "How do I connect my HP printer to Wi-Fi?",
      answer: "Use the printer's control panel to select your wireless network, enter your password, and follow the on-screen instructions to complete the connection.",
    },
    {
      question: "How do I install HP printer drivers?",
      answer: "Download the latest drivers from the HP support website, run the installer, and follow the prompts to complete the installation process.",
    },
    {
      question: "Why is my HP printer offline?",
      answer: "Check your printer's connection, restart both your printer and computer, and verify that the printer is set as the default device.",
    },
    {
      question: "How do I reinstall HP printer software?",
      answer: "Uninstall the current software, restart your computer, download the latest version from HP, and run the installer again.",
    },
    {
      question: "How do I print from my phone?",
      answer: "Use HP Smart app, Apple AirPrint, or Google Cloud Print to send print jobs directly from your smartphone or tablet.",
    },
    {
      question: "Can I use USB setup?",
      answer: "Yes! Connect your printer to your computer using a USB cable and follow the automatic installation prompts.",
    },
    {
      question: "How do I fix printer connection issues?",
      answer: "Check your network settings, restart your router, verify cable connections, and run the HP Print and Scan Doctor tool.",
    },
    {
      question: "How long does setup take?",
      answer: "Typical setup takes 10-15 minutes, depending on your printer model and internet connection speed.",
    },
    {
      question: "What should I do if setup fails?",
      answer: "Restart the setup process, check all connections, verify your internet, and consult our troubleshooting section for specific errors.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">FAQ</h2>
          <p className="text-xl text-gray-600">
            Answers to common questions about HP printer setup
          </p>
        </motion.div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 text-hp-blue flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-gray-600">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
