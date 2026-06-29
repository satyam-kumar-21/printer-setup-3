import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Printer Setup | Easy Wireless Printer Installation Guide",
  description:
    "Learn how to set up your wireless printer with step-by-step instructions for setup, USB installation, driver installation, scanner configuration, and troubleshooting.",
  openGraph: {
    title: "Printer Setup | Easy Wireless Printer Installation Guide",
    description:
      "Learn how to set up your wireless printer with step-by-step instructions for setup, USB installation, driver installation, scanner configuration, and troubleshooting.",
    url: "https://example.com/printer-setup",
    siteName: "Printer Setup Guide",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Printer Setup | Easy Wireless Printer Installation Guide",
    description:
      "Learn how to set up your wireless printer with step-by-step instructions for setup, USB installation, driver installation, scanner configuration, and troubleshooting.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
