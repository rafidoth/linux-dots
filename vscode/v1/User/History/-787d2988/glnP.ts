import { AvalabilityType } from "@/app/types";
import { ApiRequestType } from "../apiClient";

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
}
