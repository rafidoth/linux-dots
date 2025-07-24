"use server";

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
