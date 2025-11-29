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

    // Inject Montserrat font and helper script to auto-size iframe height
    const fontInject = `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        html, body, * {
          font-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif !important;
        }
        html, body {
          margin: 0 !important;
          padding: 0 !important;
        }
        /* Make media responsive so large images don’t overflow or crop oddly */
        img, video, svg, canvas {
          max-width: 100%;
          height: auto;
        }
      </style>
      <script>
        (function() {
          function send() {
            try {
              var h = Math.max(
                document.documentElement.scrollHeight || 0,
                document.body.scrollHeight || 0
              );
              var file = (function(){
                try { return new URL(window.location.href).searchParams.get('file') || ''; } catch(e) { return ''; }
              })();
              parent.postMessage({ type: 'hero-content-height', height: h, file: file }, window.location.origin);
            } catch (e) {}
          }
          window.addEventListener('load', send);
          window.addEventListener('resize', send);
          var obs;
          try {
            obs = new MutationObserver(function() { send(); });
            obs.observe(document.body, { childList: true, subtree: true });
          } catch (e) {}
          setTimeout(send, 300);
        })();
      </script>
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
  } catch {
    return new NextResponse("Failed to fetch upstream content", { status: 500 });
  }
}