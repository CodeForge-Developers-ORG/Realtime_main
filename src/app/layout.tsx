// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { checkMaintenanceMode } from "@/services/maintenanceService";
import "./globals.css";
import FloatingButtons from "@/components/common/FloatingButtons";
import PopupModal from "@/components/common/PopupModal";
import AnalyticsProvider from "@/components/layout/AnalyticsProvider";
import MaintenancePage from "@/components/common/MaintenancePage";

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

// Cache maintenance status for 1 minute to avoid too many API calls
let maintenanceCache = {
  status: false,
  timestamp: 0,
};

const CACHE_DURATION = 60 * 1000; // 1 minute

async function getMaintenanceStatus() {
  // Return cached status if it's still valid
  if (Date.now() - maintenanceCache.timestamp < CACHE_DURATION) {
    return maintenanceCache.status;
  }

  try {
    const isMaintenance = await checkMaintenanceMode();
    // Update cache
    maintenanceCache = {
      status: isMaintenance,
      timestamp: Date.now(),
    };
    return isMaintenance;
  } catch (error) {
    // If API fails, return cached status or false as fallback
    return maintenanceCache.status || false;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenance = await getMaintenanceStatus();

  // Agar maintenance mode on hai toh sirf maintenance component dikhao
  if (isMaintenance) {
    return (
      <html lang="en">
        <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
          <MaintenancePage />
        </body>
      </html>
    );
  }

  // Normal site content - maintenance off hai
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