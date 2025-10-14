// /app/api/login/route.ts
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

if (!JWT_SECRET) throw new Error("JWT_SECRET not set in env");

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // build token
    const alg = "HS256";
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(JWT_SECRET);

    const token = await new SignJWT({ email, role: "admin" })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRES_IN)
      .sign(secretKey);

    // set httpOnly cookie
    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      // optionally set maxAge (in seconds) - keep in sync with JWT expiry
      maxAge: 60 * 60, // 1 hour
    });

    return res;
  }

  return NextResponse.json(
    { ok: false, error: "Invalid credentials" },
    { status: 401 }
  );
}
