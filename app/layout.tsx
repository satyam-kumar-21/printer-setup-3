import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HP Printer Setup | Easy Wireless Printer Installation Guide",
  description: "Learn how to set up your HP printer with step-by-step instructions for wireless setup, USB installation, driver installation, scanner configuration, and troubleshooting.",
  openGraph: {
    title: "HP Printer Setup | Easy Wireless Printer Installation Guide",
    description: "Learn how to set up your HP printer with step-by-step instructions for wireless setup, USB installation, driver installation, scanner configuration, and troubleshooting.",
    url: "https://example.com/hp-printer-setup",
    siteName: "HP Printer Setup Guide",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HP Printer Setup | Easy Wireless Printer Installation Guide",
    description: "Learn how to set up your HP printer with step-by-step instructions for wireless setup, USB installation, driver installation, scanner configuration, and troubleshooting.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
