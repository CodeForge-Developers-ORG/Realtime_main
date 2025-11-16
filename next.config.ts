import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.realtimebiometrics.net",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
