import { apiRequest, ApiRequestType } from "../apiClient";

export async function addAvailability(start: Date, end: Date) {
  const req: ApiRequestType = {
    endpoint: "api/mentor/avalability/add",
    method: "POST",
    body: {
      startTime: start,
      endTime: end,
    },
    auth: true,
  };
  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Adding Avalability Failed.");
  }
  return res;
}
