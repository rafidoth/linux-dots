"use server";
import { cookies } from "next/headers";
import { getSignInApi } from "../api";
import { SignInSchemaType } from "@/app/ui/LoginForm";
import { redirect } from "next/navigation";

export default async function signInAction(
  prevState,
  signInData: SignInSchemaType
) {
  const url = getSignInApi(student);
  console.log(signInData);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include cookies if needed
      // "Authorization": `Bearer ${yourToken}`
    },
    body: JSON.stringify(signInData),
    credentials: "include", // if you want to send cookies
  });

  if (!response.ok) {
    return { error: "Sign in failed. Please try again." };
  }

  const token = response.headers.get("set-cookie");
  if (!token) {
    throw new Error("Failed to retrieve auth token from response");
  }
  const data = await response.json();
  const cookieStore = cookies();
  (await cookieStore).set("auth_token", token, {
    path: "/",
    sameSite: "lax",
  });
  console.log(data);
  redirect(student ? "/s/explore" : "/m/explore");
}
