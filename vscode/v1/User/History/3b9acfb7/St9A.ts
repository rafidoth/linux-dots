"use server";
import { cookies } from "next/headers";
import { SignInSchemaType } from "@/app/ui/LoginForm";
import { redirect } from "next/navigation";
import { StudentRegisterDataType } from "./sign-up/ui/SignupStudent";
import { apiRequest, ApiRequestType } from "../lib/apiClient";
import { MentorRegisterDataType } from "./sign-up/ui/SignupMentor";
//import type { SignUpFormValues } from "@/app/(student)/ui/SignUpForm";

export async function registerStudent(data: StudentRegisterDataType) {
  const req: ApiRequestType = {
    endpoint: `api/student/register`,
    method: "POST",
    body: {
      name: data.name,
      email: data.email,
      username: data.username,
      gender: data.gender,
      grad_year: data.grad_year,
      dob: data.dob.toISOString(),
      password: data.password,
      image: null,
    },
    auth: false,
  };

  const response = await apiRequest(req);
  if (!response.success) {
    throw new Error("Registration Failed");
  }
  const jwt = response.jwtToken;

  const cookieStore = await cookies();
  cookieStore.set("auth_token", jwt, {
    path: "/",
    sameSite: "lax",
  });
  const student_id = response.student_id;
  localStorage.setItem("student-id", student_id);

  redirect("/s/myprofile");
}

export async function registerMentor(data: MentorRegisterDataType) {
  const req: ApiRequestType = {
    endpoint: `api/mentor/register`,
    method: "POST",
    body: {
      name: data.name,
      email: data.email,
      username: data.username,
      gender: data.gender,
      grad_year: data.grad_year,
      socials: {
        github: data.socials.github,
        facebook: data.socials.facebook,
        linkedin: data.socials.linkedin,
        twitter: data.socials.twitter,
      },
      dob: data.dob.toISOString(),
      password: data.password,
      image: null,
    },
    auth: false,
  };

  console.log(req.body);

  const response = await apiRequest(req);
  if (!response.success) {
    throw new Error("Registration Failed");
  }
  const jwt = response.jwtToken;

  const cookieStore = await cookies();
  cookieStore.set("auth_token", jwt, {
    path: "/",
    sameSite: "lax",
  });
  redirect("/m/findmentor");
}

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
  const authToken = data.jwtToken;
  if (!authToken) {
    throw new Error("Failed to retrieve auth token from response");
  }

  console.log("authToken from backend", authToken);

  const cookieStore = await cookies();
  cookieStore.set("auth_token", authToken, {
    path: "/",
    sameSite: "lax",
  });

  const student_id = data.student_id;
  localStorage.setItem("student-id", student_id);
  return {
    succsess: true,
    data: data,
  };
  redirect(student ? "/s/explore" : "/m/explore");
}
