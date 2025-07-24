import { StudentInfoSchema } from "@/app/(student)/schemas";
import { apiRequest, ApiRequestType } from "@/app/lib/apiClient";
import { StudentInfoType } from "@/app/types";

export async function getStudentPersonalInfo(sID: string) {
  const req: ApiRequestType = {
    endpoint: `api/student/${sID}`,
    method: "GET",
    auth: true,
  };
  const res1 = await apiRequest(req);
  if (res1.success === false) {
    throw new Error("Failed to fetch student info");
  }
  const res = res1.data;
  const studentPersonalInfo = StudentInfoSchema.parse(res);
  console.log("student info ", studentPersonalInfo);

  return studentPersonalInfo;
}

export async function getMentorAvailableSlots(mID: string) {
  const req: ApiRequestType = {
    endpoint: `api/student/mavaliableat/${mID}`,
    method: "GET",
    auth: true,
  };
  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Failed to fetch mentor availability");
  }
  return res.data;
}

export async function getMentorAvailabliltyById(aId: string) {
  const req: ApiRequestType = {
    endpoint: `api/student/mavaliableat/${aId}`,
    method: "GET",
    auth: true, // student auth
  };

  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Failed to fetch mentor availability");
  }
  return res.data;
}

export async function getMentorBasedOnInterest() {
  const req: ApiRequestType = {
    endpoint: `api/student/findmentor/interest`,
    method: "GET",
    auth: true,
  };
  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Failed to fetch mentor availability");
  }
  return res.data;
}

export async function getMentorBasedOnLevel() {
  const req: ApiRequestType = {
    endpoint: `api/student/findmentor/level`,
    method: "GET",
    auth: true,
  };
  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Failed to fetch mentor availability");
  }
  return res.data;
}

export async function getStudentBookedSessions(sID: string) {
  const req: ApiRequestType = {
    endpoint: `api/student/booked/${sID}`,
    method: "GET",
    auth: true,
  };

  const res = await apiRequest(req);
  console.log(res);
  if (!res.success) {
    throw new Error("Error fetching Booked Sessions");
  }
  return res.data;
}

export async function getMyProfileDetails() {
  const req: ApiRequestType = {
    endpoint: `api/student/myself`,
    method: "GET",
    auth: true,
  };

  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Error fetching my (student) details");
  }
  const refined: StudentInfoType = { ...res.data };
  refined.dob = new Date(res.data.dob);
  return refined;
}
