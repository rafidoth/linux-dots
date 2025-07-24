import { AvalabilityType } from "@/app/types";
import { apiRequest, ApiRequestType } from "../apiClient";

export async function sendSlotRequest(mId: string, slots: AvalabilityType[]) {
  const req: ApiRequestType = {
    endpoint: "api/student/mavailableat/request",
    method: "POST",
    body: {
      mentorId: mId,
      slots: slots,
    },
    auth: true,
  };

  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Failed to send slot requests");
  }
  console.log(res);
}

export async function sendPaymentRequest(
  sessionID: string,
  availabilityID: string
) {
  const req: ApiRequestType = {
    endpoint: `api/student/payment/${sessionID}`,
    method: "POST",
    body: {
      AvailabilityID: availabilityID,
    },
    auth: true,
  };

  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Failed to send payment request");
  }
  return res;
}

export async function getNextBookedStudent(t: string) {
  const req: ApiRequestType = {
    endpoint: `api/student/booked/closest?t=${t}`,
    method: "GET",
    auth: true,
  };

  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Failed to fetch next booked session");
  }
  const refined = { ...res.data };
  refined.StartTime = new Date(res.data.StartTime);

  return refined;
}
