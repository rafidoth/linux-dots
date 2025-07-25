import { apiRequest, ApiRequestType } from "../apiClient";

export async function getGroupSessionsList() {
  const req: ApiRequestType = {
    endpoint: "api/student/groupseesions/",
    method: "GET",
    auth: true,
  };

  const res = await apiRequest(req);
  console.log(res);
  if (!res.success) {
    throw new Error("Error fetching Group Sessions List");
  }
  return res.data;
}

export async function getGroupSessionsById() {
  const req: ApiRequestType = {
    endpoint: "api/student/groupseesions/gsid",
    method: "GET",
    auth: true,
  };

  const res = await apiRequest(req);
  console.log(res);
  if (!res.success) {
    throw new Error("Error fetching Group Sessions List");
  }
  return res.data;
}
