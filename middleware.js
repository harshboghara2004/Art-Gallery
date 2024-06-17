import { NextResponse } from "next/server";
export function middleware(request) {
  const token = request.headers.get("authorization");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const decoded = token === process.env.API_SECRET_KEY;

  if (!decoded) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/arts"],
};
