import { apiRequest, ApiRequestType } from "../apiClient";

export async function addAvailability(
  start: Date,
  end: Date,
  medium: ("online" | "offline")[]
) {
  const req: ApiRequestType = {
    endpoint: "api/mentor/avalability/add",
    method: "POST",
    body: {
      startTime: start,
      endTime: end,
      medium: medium,
    },
    auth: true,
  };
  console.log("Adding Availability", req);
  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Adding Avalability Failed.");
  }
  return res;
}
