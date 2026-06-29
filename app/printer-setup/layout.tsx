import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Printer Setup | Easy Wireless Printer Installation & Driver Guide",
  description:
    "Get step-by-step help setting up your wireless printer. Expert guidance for driver installation, Wi-Fi setup, scanner configuration, and troubleshooting all printer models.",
  keywords: [
    "printer setup",
    "wireless printer installation",
    "printer driver download",
    "printer troubleshooting",
    "printer offline fix",
    "wifi printer setup",
    "printer setup guide",
  ],
  openGraph: {
    title: "Printer Setup | Easy Wireless Printer Installation & Driver Guide",
    description:
      "Get step-by-step help setting up your wireless printer. Expert guidance for driver installation, Wi-Fi setup, scanner configuration, and troubleshooting all printer models.",
    url: "https://example.com/printer-setup",
    siteName: "Smart Print Setup Center",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Printer Setup | Easy Wireless Printer Installation & Driver Guide",
    description:
      "Get step-by-step help setting up your wireless printer. Expert guidance for driver installation, Wi-Fi setup, scanner configuration, and troubleshooting.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrinterSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
