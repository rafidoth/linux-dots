import { apiRequest, ApiRequestType } from "../apiClient";

export async function getAvailabilities() {
  const req: ApiRequestType = {
    endpoint: "api/mentor/availability",
    method: "GET",
    auth: false,
  };

  const res = await apiRequest(req);

  if (!res.success) {
    throw new Error("Availability fetching error");
  }
  return res.data;
}
