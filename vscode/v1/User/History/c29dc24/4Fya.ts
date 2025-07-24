import { apiRequest, ApiRequestType } from "../apiClient";

export async function getGroupSessionsList() {
  const req: ApiRequestType = {
    endpoint: "api/groupseesions/",
    method: "POST",
    auth: true,
  };

  const res = await apiRequest(req);
  console.log(res);
  if (!res.success) {
    throw new Error("Error fetching Group Sessions List");
  }
  return res.data;
}
