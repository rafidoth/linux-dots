import { apiRequest, ApiRequestType } from "@/app/lib/apiClient";

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
}
