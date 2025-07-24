import { StudentInfoSchema } from "@/app/(student)/schemas";
import { apiRequest, ApiRequestType } from "@/app/lib/apiClient";
import { z } from "zod";

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
  const studentPersonalInfo: z.infer<typeof StudentInfoSchema> = {
    name: res.data.name,
    email: res.data.email,
    username: res.username,
    gender: res.gender,
    dob: new Date(res1.dob),
    graduation_year: res1.graduation_year,
  };
  console.log("student info ", studentPersonalInfo);

  return studentPersonalInfo;
}
