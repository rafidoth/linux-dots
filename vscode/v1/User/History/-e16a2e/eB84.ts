import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const publicRoutes = ["/sign-in", "/s/sign-up", "/m/sign-up"];
const publicRoutesPattern = publicRoutes
  .map((route) => route.replace("/", "\\/"))
  .join("|");

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

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

export const config = {
  matcher: [`/((?!${publicRoutesPattern}).*)`],
};
