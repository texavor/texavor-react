// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host");

  if (host === "www.easywrite.dev" || host === "easywrite.dev") {
    const url = req.nextUrl;

    // Redirect to texavor.com while keeping the same path
    url.host = "texavor.com"; // final domain
    url.protocol = "https";

    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}
