import { apiRequest, ApiRequestType } from "../apiClient";

export async function getGroupSessionsList() {
  const req: ApiRequestType = {
    endpoint: "api/groupsessions/",
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

export async function getGroupSessionsById(gsid: string) {
  console.log(gsid);
  const req: ApiRequestType = {
    endpoint: "api/groupsessions/gsid",
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

export async function getGroupSessionParticipants(gsid: string) {
  console.log(`Fetching participants for Group Session ID: ${gsid}`);
  const req: ApiRequestType = {
    endpoint: `api/groupsessions/participantlist/gsid`, // for testing its hardcoded, we have to change it later
    method: "GET",
    auth: true,
  };

  const res = await apiRequest(req);
  console.log(res);

  if (!res.success) {
    throw new Error(
      `Error fetching participants for Group Session ID: ${gsid}`
    );
  }

  return res.data;
}
