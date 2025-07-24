"use server";

import { cookies } from "next/headers";
import type { SignUpFormValues } from "../ui/SignupFormStudent";

const api = {
  signup: "http://localhost:3000/api/student/register",
};

export async function SignupStudent(data: SignUpFormValues) {
  const response = await fetch(api.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(response);
}

export async function LoginStudent(data: SignUpFormValues) {
  const response = await fetch(api.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(response);
}

export async function GetStudentInterests() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const response = await fetch("http://localhost:3000/api/student/interests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const { data } = await response.json();
  console.log(data);
  return data;
}
