"use server";
import { cookies } from "next/headers";
import { SignInSchemaType } from "@/app/ui/LoginForm";
import { redirect } from "next/navigation";
//import type { SignUpFormValues } from "@/app/(student)/ui/SignUpForm";

export default async function signInAction(signInData: SignInSchemaType) {
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

// export async function SignupStudent(data: SignUpFormValues) {
// const api = "http://localhost:3000/api/student/signup";
// const response = await fetch(api.signup, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// });
// console.log(response);
// }

// export async function LoginStudent(data: SignUpFormValues) {
// const api = "http://localhost:3000/api/student/login";
// const response = await fetch(api.signup, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// });
// console.log(response);
// }
