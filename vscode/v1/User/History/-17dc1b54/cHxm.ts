"use server";

import { cookies } from "next/headers";

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
