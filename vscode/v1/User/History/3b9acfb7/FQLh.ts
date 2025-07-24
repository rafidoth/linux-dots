"use server";
import { cookies } from "next/headers";
import { SignInSchemaType } from "@/app/ui/LoginForm";
import { redirect } from "next/navigation";
import { StudentRegisterDataType } from "./sign-up/ui/SignupStudent";
//import type { SignUpFormValues } from "@/app/(student)/ui/SignUpForm";

export async function registerStudent(data: StudentRegisterDataType) {}

export async function signInAction(signInData: SignInSchemaType) {
  const student = signInData.student;
  console.log("student", signInData.student);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/student/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include cookies if needed
      // "Authorization": `Bearer ${yourToken}`
    },
    body: JSON.stringify({
      email: signInData.email,
      password: signInData.password,
    }),
    credentials: "include", // if you want to send cookies
  });

  if (!response.ok) {
    console.error(response.body);
    return { success: false };
  }

  const data = await response.json();
  const authToken = data.user?.jwtToken;
  if (!authToken) {
    throw new Error("Failed to retrieve auth token from response");
  }

  console.log("authToken from backend", authToken);

  const cookieStore = await cookies();
  cookieStore.set("auth_token", authToken, {
    path: "/",
    sameSite: "lax",
  });

  return {
    succsess: true,
    data: data,
  };
  redirect(student ? "/s/explore" : "/m/explore");
}
