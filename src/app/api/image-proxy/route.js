import { NextResponse } from "next/server";

function getAllowedOrigins() {
  const origins = new Set();
  origins.add("https://www.qr-dm.com");
  origins.add("https://qr-dm.com");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    try {
      origins.add(new URL(apiUrl).origin);
    } catch {
      // ignore invalid env value
    }
  }

  return origins;
}

function isAllowedUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    const allowedOrigins = getAllowedOrigins();
    return allowedOrigins.has(parsed.origin);
  } catch {
    return false;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");

  if (!target || !isAllowedUrl(target)) {
    return NextResponse.json({ message: "Invalid target URL" }, { status: 400 });
  }

  try {
    const upstream = await fetch(target, { cache: "no-store" });
    if (!upstream.ok) {
      return NextResponse.json(
        { message: "Failed to fetch image from upstream" },
        { status: upstream.status }
      );
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ message: "Proxy request failed" }, { status: 502 });
  }
}

