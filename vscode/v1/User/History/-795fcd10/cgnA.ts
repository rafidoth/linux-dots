import { apiRequest, ApiRequestType } from "../apiClient";
import { getSessionBySessionID } from "./sessions";
import { getMentorAvailabliltyById } from "./student";

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

export async function getSessionAndAvailabilityByIds(sId: string, aId: string) {
  const session = await getSessionBySessionID(sId);
  const freeslot = await getMentorAvailabliltyById(aId);
  return {
    session,
    freeslot,
  };
}
