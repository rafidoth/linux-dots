import { apiRequest, ApiRequestType } from "../apiClient";

export async function getGroupSessionsList() {
  const req: ApiRequestType = {
    endpoint: "api/student/groupsessions",
    method: "GET",
    auth: false,
  };

  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Error fetching Group Sessions List");
  }
}
