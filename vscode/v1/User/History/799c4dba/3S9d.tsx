import Profile from "@/app/ui/Profile";
import { InterestType } from "@/app/types";
import { cookies } from "next/headers";
type Props = { params: Promise<{ student_id: string }> };

const page = async ({ params }: Props) => {
  const pID = (await params).student_id;
  console.log(pID);
  const fetchedInterests: InterestType[] = await GetStudentInterests();
  const data = {
    interests: fetchedInterests,
  };
  return (
    <div>
      <Profile student data={data} />
    </div>
  );
};

export default page;

async function GetStudentInterests() {
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
      console.error(await response.text());
      return [];
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    console.log(response);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching student interests:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
