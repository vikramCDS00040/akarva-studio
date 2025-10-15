// // /middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   // During dev, fail loudly so you remember to set it
//   console.warn("JWT_SECRET not set — middleware auth will fail");
// }

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Only protect upload routes (adjust matcher below too)
//   if (!pathname.startsWith("/admin")) {
//     return NextResponse.next();
//   }

//   const token = req.cookies.get("token")?.value;
//   console.log("token: ", token);
//   if (!token || !JWT_SECRET) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   try {
//     // jwtVerify throws if invalid/expired
//     const encoder = new TextEncoder();
//     const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET));
//     // If you want, you can inspect payload here and allow/deny by role/email
//     // e.g., if (payload.role !== 'admin') { ... }

//     return NextResponse.next();
//   } catch (err) {
//     // invalid token — redirect to login
//     return NextResponse.redirect(new URL("/", req.url));
//   }
// }

// export const config = {
//   matcher: ["/admin/:path*"], // protect /upload and everything under it
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn("JWT_SECRET not set — middleware auth will fail");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const encoder = new TextEncoder();

  // If user has a token, try to verify it
  let isValidToken = false;
  if (token && JWT_SECRET) {
    try {
      await jwtVerify(token, encoder.encode(JWT_SECRET));
      isValidToken = true;
    } catch (_err) {
      isValidToken = false;
    }
  }

  // Redirect logged-in users away from /login (or root)
  if (pathname === "/login" && isValidToken) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Protect /admin routes
  if ((pathname.startsWith("/admin") || pathname.startsWith("/gallery-admin") || pathname.startsWith("/gallery-s3")) && !isValidToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/admin/:path*", "/gallery-admin/:path*", "/gallery-s3/:path*"], // protect login redirect + admin routes
};
