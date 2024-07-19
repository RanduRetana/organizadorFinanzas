import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value;

  if (isAuthenticated !== "true") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
