import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Printer Assist Official | Setup & Diagnostics Solutions",
  description:
    "Get authentic, reliable support for your printer. Easy setup guides, driver downloads, wireless configuration, and expert diagnostics for all major brands.",
  keywords: [
    "printer assist",
    "official printer setup",
    "printer diagnostics",
    "download printer drivers",
    "printer help desk",
    "connect wireless printer",
  ],
  openGraph: {
    title: "Printer Assist Official | Setup & Diagnostics Solutions",
    description:
      "Get authentic, reliable support for your printer. Easy setup guides, driver downloads, wireless configuration, and expert diagnostics.",
    url: "https://example.com/printer-setup2",
    siteName: "Printer Assist Official",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Printer Assist Official | Setup & Diagnostics Solutions",
    description:
      "Get authentic, reliable support for your printer setup and troubleshooting.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrinterSetup2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-blue-200">{children}</div>;
}
