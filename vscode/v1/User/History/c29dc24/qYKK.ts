import { apiRequest, ApiRequestType } from "./apiClient";

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

// cancel registration of student in group session
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

export async function createGroupDiscussion(Body: {
  title: string;
  description: string;
  startDate: Date;
  durationInMinutes: number;
  maxParticipants: number;
  mentorId: string;
}) {
  const req: ApiRequestType = {
    endpoint: "api/groupsessions/create",
    method: "POST",
    body: Body,
    auth: true,
  };

  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Error Creating Group session");
  }
  return res.data;
}
