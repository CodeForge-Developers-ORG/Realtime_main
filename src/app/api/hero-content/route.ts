import { NextRequest, NextResponse } from "next/server";
import { imageLink } from "@/services/heroServices";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file") || "";

  if (!file) {
    return new NextResponse("Missing 'file' query param", { status: 400 });
  }

  // Allow only hero-slides/html path to avoid arbitrary fetching
  if (!/^hero-slides\/html\/[A-Za-z0-9_.\-]+\.html$/i.test(file)) {
    return new NextResponse("Invalid file path", { status: 400 });
  }

  const url = `${imageLink}${file}`;

  try {
    const upstream = await fetch(url, { method: "GET" });
    if (!upstream.ok) {
      return new NextResponse(`Upstream error (${upstream.status})`, { status: 502 });
    }
    const html = await upstream.text();

    // Inject Montserrat font links and a forcing style into the HTML
    const fontInject = `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        html, body, * {
          font-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif !important;
        }
      </style>
    `;

    let transformed = html;
    if (/<head[^>]*>/i.test(html)) {
      transformed = html.replace(/<head[^>]*>/i, (m) => `${m}\n${fontInject}`);
    } else {
      // If there's no <head>, prepend the inject at the start to be safe
      transformed = `${fontInject}\n${html}`;
    }

    return new NextResponse(transformed, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=60", // small cache
      },
    });
  } catch (err) {
    return new NextResponse("Failed to fetch upstream content", { status: 500 });
  }
}