"use server";
import { cookies } from "next/headers";
import { getSignInApi } from "../../api";
import { SignInSchemaType } from "@/app/ui/LoginForm";
import { redirect } from "next/navigation";
//import type { SignUpFormValues } from "@/app/(student)/ui/SignUpForm";

export default async function signInAction(
  prevState: { error: string },
  signInData: SignInSchemaType
) {
  const student = signInData.student;
  const url = getSignInApi(student);
  const response = await fetch(url, {
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
    return { error: "Sign in failed. Please try again." };
  }

  const authToken = response.headers.get("set-cookie");
  if (!authToken) {
    throw new Error("Failed to retrieve auth token from response");
  }
  console.log("authToken from backend", authToken);
  const data = await response.json();
  const cookieStore = await cookies();
  cookieStore.set("auth_token", authToken, {
    path: "/",
    sameSite: "lax",
  });
  console.log("retrieved data", data);
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
