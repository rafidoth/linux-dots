import Profile from "@/app/ui/Profile";
import { InterestType } from "@/app/types";
import { apiRequest, ApiRequestType } from "@/app/lib/apiClient";
type Props = { params: Promise<{ mentor_id: string }> };

const page = async ({ params }: Props) => {
  const mID = (await params).mentor_id;
  console.log(mID);
  const req: ApiRequestType = {
    endpoint: `api/mentor/interests/list`,
    method: "GET",
    auth: true,
  };
  const fetchedInterests: InterestType[] = (await apiRequest(req)).data;
  return (
    <div>
      <Profile student={false} interests={fetchedInterests} query_id={mID} />
    </div>
  );
};

export default page;
