import { StudentInfoSchema } from "@/app/(student)/schemas";
import { apiRequest, ApiRequestType } from "@/app/lib/apiClient";

export async function getStudentPersonalInfo(sID: string) {
  const req: ApiRequestType = {
    endpoint: `api/student/${sID}`,
    method: "GET",
    auth: true,
  };
  const res1 = await apiRequest(req);
  if (res1.success === false) {
    throw new Error("Failed to fetch student info");
  }
  const res = res1.data;
  const studentPersonalInfo = StudentInfoSchema.parse(res);
  console.log("student info ", studentPersonalInfo);

  return studentPersonalInfo;
}
