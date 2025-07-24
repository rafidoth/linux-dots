import { ApiRequestType } from "../apiClient";

export function addAvailability(start: Date, end: Date) {
  const req: ApiRequestType = {
    endpoint: "api/mentor/avalability/add",
  };
}
