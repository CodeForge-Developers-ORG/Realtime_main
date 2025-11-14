// app/layout.tsx or app/layout.js
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google"; // Replace Geist with Inter
import "./globals.css";
import FloatingButtons from "@/components/common/FloatingButtons";
import PopupModal from "@/components/common/PopupModal";
import AnalyticsProvider from "@/components/layout/AnalyticsProvider";

// Use Inter instead of Geist
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Realtime Security Solutions",
  description: "Advanced security systems for homes and businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
         <AnalyticsProvider />
        {children}
        <FloatingButtons />
        <PopupModal />
      </body>
    </html>
  );
}
