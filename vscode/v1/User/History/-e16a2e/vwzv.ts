import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const publicRoutes = ["/sign-in", "/s/sign-up"];

export async function middleware(req: NextRequest) {
    publicRoutes.forEach((route) => {
    if (req.url.pathname.eqauals(route)) {}

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}
