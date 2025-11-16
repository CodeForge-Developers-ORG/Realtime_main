import { NextResponse, type NextRequest } from "next/server";

// Allow-list paths when maintenance mode is ON
const ALLOWED_PATHS = [
  "/sales",
  "/maintenance",
];

// Asset prefixes to skip
const ASSET_PREFIXES = [
  "/_next",
  "/static",
  "/favicon.ico",
  "/images",
  "/media",
  "/css",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip assets and API routes
  if (
    pathname.startsWith("/api") ||
    ASSET_PREFIXES.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.next();
  }

  // Allow specific pages during maintenance
  if (ALLOWED_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check maintenance status from backend
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "https://app.realtimebiometrics.net/api";
  try {
    const res = await fetch(`${base}/site/header`, { cache: "no-store" });
    const data = await res.json();
    const maintenance = Boolean(data?.data?.status?.maintenance_mode);

    if (maintenance) {
      const url = req.nextUrl.clone();
      url.pathname = "/maintenance";
      return NextResponse.rewrite(url);
    }
  } catch {
    // On failure, do not block navigation
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};