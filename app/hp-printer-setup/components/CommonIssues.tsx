"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

const issues = [
  {
    title: "HP Printer Offline",
    desc: "Troubleshoot and fix offline printer issues",
    content: "If your HP printer is showing as offline, first check the power and connection cables. Restart both your printer and computer. For wireless printers, verify your Wi-Fi connection. You can also use the HP Print and Scan Doctor tool to diagnose and fix common connectivity problems automatically.",
  },
  {
    title: "HP Printer Not Printing",
    desc: "Resolve printing errors and blank pages",
    content: "If your HP printer won't print, check that there's paper in the tray and that the ink or toner cartridges are not empty. Try printing a test page from the printer's control panel. Restart the print spooler service on your computer, or reinstall the printer drivers if the issue persists.",
  },
  {
    title: "HP Driver Installation Error",
    desc: "Fix driver installation problems",
    content: "Driver installation errors can occur due to corrupted files or system issues. Download the latest drivers from the official HP website, disconnect your printer temporarily, run the installer as administrator, and follow the on-screen instructions carefully.",
  },
  {
    title: "HP Wi-Fi Connection Issues",
    desc: "Resolve wireless connection problems",
    content: "For Wi-Fi connection issues, check your router settings and make sure your printer is within range. Restart your router and printer, then try reconnecting. Use the HP Smart app to guide you through wireless setup and troubleshoot connectivity problems step by step.",
  },
  {
    title: "HP Scanner Not Working",
    desc: "Fix scanner and scanning errors",
    content: "If your HP scanner isn't working, check the USB or wireless connection first. Make sure the scanner software is properly installed. Restart both devices and try scanning using different software (like HP Smart, Windows Scan, or Image Capture on Mac).",
  },
  {
    title: "HP Paper Jam",
    desc: "Clear paper jams safely and easily",
    content: "Paper jams are common and easy to fix. Turn off your printer and unplug it. Gently pull out any jammed paper from the input and output trays, being careful not to tear the paper. Check for any remaining bits of paper inside the printer, then plug it back in and restart.",
  },
  {
    title: "HP Ink Cartridge Error",
    desc: "Resolve cartridge and ink issues",
    content: "Ink cartridge errors can happen if the cartridges are not properly seated, are empty, or are expired. Remove and reinsert the cartridges, check for any protective tape still on them, and try using genuine HP cartridges. You can also run the printer's cleaning cycle to fix quality issues.",
  },
  {
    title: "HP Print Quality Problems",
    desc: "Fix blurry, faded, or streaky prints",
    content: "Poor print quality can be caused by low ink/toner, clogged printheads, or incorrect paper settings. Run the print head cleaning function from the printer's control panel or HP Smart app. Use HP recommended paper for best results.",
  },
];

export default function CommonIssues() {
  const [selectedIssue, setSelectedIssue] = useState<typeof issues[0] | null>(null);

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Common HP Printer Problems</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find solutions to the most common HP printer issues
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {issues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="bg-gradient-to-br from-white to-hp-light/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 cursor-pointer"
              >
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{issue.desc}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedIssue(issue)}
                  className="text-hp-blue font-semibold text-sm hover:underline flex items-center gap-1"
                >
                  Learn More →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {selectedIssue && (
        <Modal
          isOpen={!!selectedIssue}
          onClose={() => setSelectedIssue(null)}
          title={selectedIssue.title}
          content={selectedIssue.content}
        />
      )}
    </>
  );
}
