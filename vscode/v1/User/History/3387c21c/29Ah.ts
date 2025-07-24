import { StudentInfoSchema } from "@/app/(student)/schemas";
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
  const studentPersonalInfo = StudentInfoSchema.parse(res);
  console.log("mentor info ", studentPersonalInfo);

  return studentPersonalInfo;
}
