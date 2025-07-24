"use server";
import { getSignInApi } from "../api";

export default async function signInAction(student: boolean) {
  const url = getSignInApi(student);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include cookies if needed
      // "Authorization": `Bearer ${yourToken}`
    },
    body: JSON.stringify({
      // Whatever data you need to send in the body
      role: student ? "student" : "mentor",
    }),
    credentials: "include", // if you want to send cookies
  });

  if (!response.ok) {
    throw new Error(`Sign in failed: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}
