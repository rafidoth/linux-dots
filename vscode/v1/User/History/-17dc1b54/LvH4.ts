"use server";

import type { SignUpFormValues } from "../(student)/ui/SignupFormStudent";

const api = {
  signup: "http://localhost:3000/api/student/register",
};

export async function SignupFormStudent(data: SignUpFormValues) {
  const response = await fetch(api.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(response);
}
