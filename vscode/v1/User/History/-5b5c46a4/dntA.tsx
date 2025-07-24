import Profile from "@/app/ui/Profile";
import { InterestType, MentorPublicProfileType } from "@/app/types";
import { apiRequest, ApiRequestType } from "@/app/lib/apiClient";
import { getMentorPublicProfile } from "@/app/lib/fetchers/mentor";
type Props = { params: Promise<{ mentor_id: string }> };

const page = async ({ params }: Props) => {
  const mID = (await params).mentor_id;
  const mData: MentorPublicProfileType = await getMentorPublicProfile(mID);
  return (
    <div>
      <Profile student={false} interests={fetchedInterests} query_id={mID} />
    </div>
  );
};

export default page;
