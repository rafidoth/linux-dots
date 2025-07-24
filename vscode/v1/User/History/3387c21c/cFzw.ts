import { MentorInfoSchema } from "@/app/(mentor)/schemas";
import { apiRequest, ApiRequestType } from "@/app/lib/apiClient";

export async function getMentorPersonalInfo(mID: string) {
  const req: ApiRequestType = {
    endpoint: `api/mentor/${mID}`,
    method: "GET",
    auth: true,
  };
  const res1 = await apiRequest(req);
  if (res1.success === false) {
    throw new Error("Failed to fetch mentor info");
  }
  const res = res1.data;
  const mentorPersonalInfo = MentorInfoSchema.parse(res);
  console.log("mentor info ", mentorPersonalInfo);
  return mentorPersonalInfo;
}
