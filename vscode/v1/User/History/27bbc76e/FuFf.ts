import { apiRequest, ApiRequestType } from "@/app/lib/apiClient";
import { SessionInfoType } from "@/app/types";

export async function getSessionsMentor() {
  const req: ApiRequestType = {
    endpoint: `api/mentor/sessions`,
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

export async function getSessionsStudent() {
  const req: ApiRequestType = {
    endpoint: `api/student/sessions`,
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
