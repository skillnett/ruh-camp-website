import "@/assets/style/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const benzin = localFont({
  src: [
    {
      path: "../assets/fonts/Benzin-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Benzin-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Benzin-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Benzin-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-benzin",
  fallback: ["sans-serif"],
});

// Note: This is a fallback metadata. Child pages should override with generateMetadata
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "http://localhost:3000"
  );
};

export const metadata: Metadata = {
  title: {
    default: "STEP CAMP — табір, що рухає дітей уперед",
    template: "%s | STEP CAMP — табір, що рухає дітей уперед",
  },
  description: "Дитячий та підлітковий кемп, де кожен прокачує свій STEP LEVEL: спорт, скілли, характер, впевненість, навчання та емоції",
  openGraph: {
    type: "website",
    siteName: "STEP CAMP",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${benzin.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
