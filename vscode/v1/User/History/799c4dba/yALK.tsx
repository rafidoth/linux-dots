import Profile from "@/app/ui/Profile";
import { InterestType } from "@/app/types";
// import { cookies } from "next/headers";
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
  const fetchedInterests: InterestType[] = (await apiRequest(req)).data;
  return (
    <div>
      <Profile student interests={fetchedInterests} />
    </div>
  );
};

export default page;
