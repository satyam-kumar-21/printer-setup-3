import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Printer Setup Wizard | Download Drivers & Configure Connection",
  description:
    "Launch our guided printer setup wizard to identify your printer model, download the correct drivers, configure Wi-Fi or USB connections, and resolve installation errors instantly.",
  keywords: [
    "printer setup wizard",
    "printer driver install",
    "download printer driver",
    "printer wifi setup",
    "printer installation guide",
    "printer error 1603",
    "printer not installing",
    "printer driver configuration",
  ],
  openGraph: {
    title: "Start Printer Setup Wizard | Download Drivers & Configure Connection",
    description:
      "Launch our guided printer setup wizard to identify your printer model, download the correct drivers, configure Wi-Fi or USB connections, and resolve installation errors instantly.",
    url: "https://example.com/printer-setup/start",
    siteName: "Smart Print Setup Center",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Printer Setup Wizard | Download Drivers & Configure Connection",
    description:
      "Launch our guided printer setup wizard to identify your printer model, download drivers, and resolve installation errors in minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function StartSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
