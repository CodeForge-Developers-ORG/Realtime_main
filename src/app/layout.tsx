// app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Geist_Mono, Rajdhani } from "next/font/google";
import { checkMaintenanceMode } from "@/services/maintenanceService";
import "./globals.css";
import FloatingButtons from "@/components/common/FloatingButtons";
import PopupModal from "@/components/common/PopupModal";
import AnalyticsProvider from "@/components/layout/AnalyticsProvider";
import MaintenancePage from "@/components/common/MaintenancePage";
import GlobalPreloader from "@/components/common/GlobalPreloader";

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
        <body className={`${montserrat.variable} ${geistMono.variable} ${rajdhani.variable} antialiased`}>
          <MaintenancePage />
        </body>
      </html>
    );
  }

  // Normal site content - maintenance off hai
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${geistMono.variable} ${rajdhani.variable} antialiased`}>
        <AnalyticsProvider />
        <GlobalPreloader />
        {children}
        <FloatingButtons />
        <PopupModal />
      </body>
    </html>
  );
}