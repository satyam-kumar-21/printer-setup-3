"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

const printers = [
  {
    name: "HP DeskJet",
    desc: "All-in-one printers for home use",
    content: "HP DeskJet printers are perfect for home use, offering printing, scanning, and copying capabilities. These affordable printers are easy to set up and use, with wireless printing options available on many models. Ideal for everyday printing tasks like homework, documents, and photos.",
  },
  {
    name: "HP ENVY",
    desc: "Premium photo and document printers",
    content: "HP ENVY printers deliver professional-quality prints for both photos and documents. With advanced features like automatic two-sided printing, wireless connectivity, and HP Smart app integration, ENVY printers are perfect for creative projects and home offices.",
  },
  {
    name: "HP OfficeJet",
    desc: "Professional office printers",
    content: "HP OfficeJet printers are designed for small business and home office use. With fast printing speeds, high-capacity ink cartridges, and advanced scanning features, OfficeJet printers help you stay productive and efficient.",
  },
  {
    name: "HP LaserJet",
    desc: "High-speed laser printers",
    content: "HP LaserJet printers offer fast, professional-quality printing with sharp text and graphics. These reliable printers are perfect for busy offices, with options for color printing, wireless connectivity, and high-volume printing.",
  },
  {
    name: "HP Smart Tank",
    desc: "Cost-effective tank printers",
    content: "HP Smart Tank printers feature innovative ink tank technology, delivering thousands of prints at a low cost per page. With easy-to-refill ink tanks and wireless printing, Smart Tank printers are great for high-volume printing needs.",
  },
  {
    name: "HP DesignJet",
    desc: "Large format plotter printers",
    content: "HP DesignJet printers are professional large-format printers perfect for architects, engineers, and designers. Print high-quality blueprints, posters, and banners with exceptional color accuracy and detail.",
  },
];

export default function SupportedPrinters() {
  const [selectedPrinter, setSelectedPrinter] = useState<typeof printers[0] | null>(null);

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Supported HP Printer Series</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our guide supports all popular HP printer models
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {printers.map((printer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="bg-gradient-to-br from-hp-blue/10 to-hp-navy/10 p-8 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-hp-blue to-hp-navy rounded-2xl flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{printer.name}</h3>
                  <p className="text-gray-600 mb-4">{printer.desc}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPrinter(printer)}
                    className="w-full py-3 px-4 text-hp-blue font-semibold border-2 border-hp-blue rounded-xl hover:bg-hp-blue hover:text-white transition-all"
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {selectedPrinter && (
        <Modal
          isOpen={!!selectedPrinter}
          onClose={() => setSelectedPrinter(null)}
          title={selectedPrinter.name}
          content={selectedPrinter.content}
        />
      )}
    </>
  );
}
