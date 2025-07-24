import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const publicRoutes = ["/sign-in", "/s/sign-up", "/m/sign-up"];
const publicRoutesPattern = publicRoutes
  .map((route) => route.replace("/", "\\/"))
  .join("|");

export default async function handler(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    await jwtVerify(token, secret);
    // Proceed with handling the request
    return NextResponse.json({ data: "Protected data" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: `/:path*`,
  exclude: new RegExp(`^(${publicRoutesPattern})$`),
};
