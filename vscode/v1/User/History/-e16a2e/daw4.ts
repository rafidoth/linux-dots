import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
console.log(secret);
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const isPublicRoute = publicRoutes.some(
    (route) =>
      req.nextUrl.pathname === route ||
      req.nextUrl.pathname.startsWith(`${route}/`)
  );

  // If it's a public route, allow access without authentication
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, check for authentication
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  console.log("token middlware", token);

  if (!token) {
    console.error("token not found middleware");
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
