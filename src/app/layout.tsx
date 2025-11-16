// app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Geist_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import FloatingButtons from "@/components/common/FloatingButtons";
import PopupModal from "@/components/common/PopupModal";
import AnalyticsProvider from "@/components/layout/AnalyticsProvider";
import GlobalPreloader from "@/components/common/GlobalPreloader";
import { Suspense } from "react";

// Use Montserrat for the primary sans font
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Add Rajdhani for heading style replication
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Realtime Security Solutions",
  description: "Advanced security systems for homes and businesses",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${geistMono.variable} ${rajdhani.variable} antialiased`}>
        <AnalyticsProvider />
        <Suspense fallback={null}>
          <GlobalPreloader />
        </Suspense>
        {children}
        <FloatingButtons />
        <PopupModal />
      </body>
    </html>
  );
}