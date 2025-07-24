import { apiRequest, ApiRequestType } from "../apiClient";

export async function joinGroupSession(studentId: string, gsid: string) {
  const req: ApiRequestType = {
    endpoint: "api/groupseesions/join",
    method: "POST",
    body: {
      GroupSessionId: gsid,
      ParticipantId: studentId,
    },
    auth: true,
  };

  const res = await apiRequest(req);
  console.log(res);
  if (!res.success) {
    throw new Error("Error Joining Group session");
  }
  return res.data;
}
