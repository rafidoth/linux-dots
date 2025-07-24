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
