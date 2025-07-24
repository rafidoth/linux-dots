import { cookies } from "next/headers";

export async function extractCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  return token;
}
