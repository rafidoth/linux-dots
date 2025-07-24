"use server";
import { getSignInApi } from "../api";
import { SignInSchemaType } from "@/app/ui/LoginForm";

export default async function signInAction(
  student: boolean,
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
    throw new Error(`Sign in failed: ${response.statusText}`);
  }
  const token = response.headers.get("set-cookie");
  const data = await response.json();
  console.log(data, token);

  return data;
}
