import { ApiRequestType } from "../apiClient";

export function getGroupSessionsList() {
  const req: ApiRequestType = {
    endpoint: "api/student/groupsessions",
    method: "GET",
    auth: false,
  };
}
