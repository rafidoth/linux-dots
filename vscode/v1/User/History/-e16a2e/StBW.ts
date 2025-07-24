import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const publicRoutes = ["/sign-in", "/s/sign-up", "/m/sign-up"];

export default async function handler(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await jwtVerify(token, secret);
    // Proceed with handling the request
    return NextResponse.json({ data: "Protected data" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
