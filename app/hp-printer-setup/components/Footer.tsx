export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-hp-blue to-hp-navy rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HP</span>
              </div>
              <span className="text-xl font-bold text-white">Printer Setup</span>
            </div>
            <p className="text-gray-400">
              The complete guide to setting up your HP printer, installing drivers, and troubleshooting common issues.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Setup Guides</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-hp-blue transition-colors">Wireless Setup</a></li>
              <li><a href="#" className="hover:text-hp-blue transition-colors">USB Setup</a></li>
              <li><a href="#" className="hover:text-hp-blue transition-colors">Driver Installation</a></li>
              <li><a href="#" className="hover:text-hp-blue transition-colors">Printer Drivers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-hp-blue transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-hp-blue transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-hp-blue transition-colors">Troubleshooting</a></li>
              <li><a href="#" className="hover:text-hp-blue transition-colors">Live Chat</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Phone: 1-800-HP-PRINT</li>
              <li>Email: support@hpsetup.com</li>
              <li>24/7 Support Available</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© 2024 HP Printer Setup Guide. This is an independent setup guide. Not affiliated with HP Inc.</p>
        </div>
      </div>
    </footer>
  );
}
