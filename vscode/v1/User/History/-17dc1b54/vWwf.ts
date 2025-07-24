"use server";

import { cookies } from "next/headers";

export async function GetStudentInterests() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${apiUrl}/api/student/interests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching student interests:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
type InterestPayloadType = {
  interestIds: string[];
};

export async function AddInterestToStudent(payload: InterestPayloadType) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${apiUrl}/api/student/interests`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to add interest: ${response.statusText}`);
    }
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding interest to student:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
