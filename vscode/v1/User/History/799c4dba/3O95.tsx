import Profile from "@/app/ui/Profile";
import { InterestType } from "@/app/types";
import { cookies } from "next/headers";
import { apiRequest, ApiRequestType } from "@/app/lib/apiClient";
// import { single_student_interests } from "@/app/(student)/fake";
type Props = { params: Promise<{ student_id: string }> };

const page = async ({ params }: Props) => {
  const pID = (await params).student_id;
  console.log(pID);
  const req: ApiRequestType = {
    endpoint: `api/student/interests/list`,
    method: "GET",
    auth: true,
  };
  const fetchedInterests: InterestType[] = await apiRequest(req);

  // const data = single_student_interests; // fake data
  // const fetchedInterests: InterestType[] = await GetStudentInterests();
  // const fetchedStudentData: StudentPersonalInfoType = await GetStudentData(pID);
  return (
    <div>
      <Profile student interests={fetchedInterests} />
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/student/interests/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(await response.text());
      return [];
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching student interests:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
