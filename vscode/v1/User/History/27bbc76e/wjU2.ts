import { apiRequest, ApiRequestType } from "@/app/lib/apiClient";
import { SessionInfoType } from "@/app/types";

export async function getSessionsMentor() {
  const req: ApiRequestType = {
    endpoint: `api/sessions/mentor`,
    method: "GET",
    auth: true,
  };
  const res = await apiRequest(req);
  if (res.success === false) {
    throw new Error("Failed to fetch mentor sessions");
  }
  const data: SessionInfoType[] = res.data;
  return data;
}

export async function getSessionsForStudentBasedOnInterest() {
  const req: ApiRequestType = {
    endpoint: `api/sessions/student/interest`,
    method: "GET",
    auth: true,
  };
  const res = await apiRequest(req);
  if (res.success === false) {
    throw new Error("Failed to fetch student sessions");
  }
  const data: SessionInfoType[] = res.data;
  return data;
}
export async function getSessionsForStudentOuterInterests() {
  console.log("sessions outside similar interests");
}

export async function getSessionBySessionID(sID: string) {
  const req: ApiRequestType = {
    endpoint: `api/sessions/${sID}`,
    method: "GET",
    auth: true,
  };
  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error(`Failed to fetch session with id ${sID}`);
  }
  const data: SessionInfoType = res.data;
  return data;
}
