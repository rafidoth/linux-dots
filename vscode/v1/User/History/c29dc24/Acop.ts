import { apiRequest, ApiRequestType } from "../apiClient";

export async function joinGroupSession(studentId: string, gsid: string) {
  const req: ApiRequestType = {
    endpoint: "api/groupsessions/join",
    method: "POST",
    body: {
      GroupSessionId: gsid,
      ParticipantId: studentId,
    },
    auth: true,
  };

  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Error Joining Group session");
  }
  return res.data;
}

export async function cancelGroupSession(studentId: string, gsid: string) {
  const req: ApiRequestType = {
    endpoint: "api/groupsessions/cancel",
    method: "PUT",
    body: {
      GroupSessionId: gsid,
      ParticipantId: studentId,
    },
    auth: true,
  };

  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Error Cancelling  Group session");
  }
  return res.success;
}
