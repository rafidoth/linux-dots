import { MentorInfoSchema } from "@/app/(mentor)/schemas";
import { apiRequest, ApiRequestType } from "@/app/lib/apiClient";
import { MentorPublicProfileType } from "@/app/types";

export async function getMentorPersonalInfo(mID: string) {
  const req: ApiRequestType = {
    endpoint: `api/mentor/${mID}`,
    method: "GET",
    auth: true,
  };
  const res1 = await apiRequest(req);
  if (res1.success === false) {
    throw new Error("Failed to fetch mentor info");
  }
  const res = res1.data;
  const mentorPersonalInfo = MentorInfoSchema.parse(res);
  console.log("mentor info ", mentorPersonalInfo);
  return mentorPersonalInfo;
}

// public api
export async function getMentorLevel(mID: string) {
  const req: ApiRequestType = {
    endpoint: `api/mentor/level/${mID}`,
    method: "GET",
    auth: false,
  };

  const res1 = await apiRequest(req);
  if (!res1.success) {
    throw new Error("Failed to fetch mentor level");
  }

  const mentorLevel = res1.data;
  console.log("mentor level ", mentorLevel);
  return mentorLevel;
}
export async function getMentorInterests(mID: string) {
  const req: ApiRequestType = {
    endpoint: `api/student/interests/${mID}`,
    method: "GET",
    auth: false,
  };

  const res1 = await apiRequest(req);
  if (!res1.success) {
    throw new Error("Failed to fetch mentor interests");
  }

  const mentorInterests = res1.data;
  console.log("mentor interests ", mentorInterests);
  return mentorInterests;
}

export async function getMentorPublicProfile(mID: string) {
  const req1: ApiRequestType = {
    endpoint: `api/mentor/public/${mID}`,
    method: "GET",
    auth: false,
  };

  const res1 = await apiRequest(req1);
  if (!res1.success) {
    throw new Error("Failed to fetch mentor profile data");
  }
  const profiledata = res1.data;

  const lvl = await getMentorLevel(mID);
  const interests = await getMentorInterests(mID);

  const data: MentorPublicProfileType = {
    ...profiledata,
    level: lvl,
    interests,
  };
  return data;
}
