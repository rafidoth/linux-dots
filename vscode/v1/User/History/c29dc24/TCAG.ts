import { apiRequest, ApiRequestType } from "../apiClient";

export async function joinGroupSession(studentId: string, gsid : string) {
  const req: ApiRequestType = {
    endpoint: "api/groupseesions/join",
    method: "POST",
    body: {
        GroupSessionId : 
    }
    auth: true,
  };

  const res = await apiRequest(req);
  console.log(res);
  if (!res.success) {
    throw new Error("Error fetching Group Sessions List");
  }
  return res.data;
}
