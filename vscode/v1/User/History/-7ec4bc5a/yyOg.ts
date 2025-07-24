import { InterestType, MentorInfoType } from "@/app/types";
import { apiRequest, ApiRequestType } from "../apiClient";

export async function addAvailability(
  start: Date,
  end: Date,
  medium: ("online" | "offline")[]
) {
  const req: ApiRequestType = {
    endpoint: "api/mentor/avalability/add",
    method: "POST",
    body: {
      startTime: start,
      endTime: end,
      medium: medium,
    },
    auth: true,
  };
  console.log("Adding Availability", req);
  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Adding Avalability Failed.");
  }
  return res;
}

export async function updateInterestListMentor(interests: InterestType[]) {
  const req: ApiRequestType = {
    endpoint: "api/mentor/interests/list",
    method: "POST",
    body: {
      interests: interests,
    },
    auth: true,
  };

  const res = await apiRequest(req);
  if (!res.success) {
    throw new Error("Failed to update interests");
  }
}

export async function updateMentorProfile(
  data: MentorInfoType,
  imageFile: null | File
) {
  const req: ApiRequestType = {
    endpoint: "api/mentor/myself",
    method: "PUT",
    body: {
      name: data.name,
      email: data.email,
      username: data.username,
      gender: data.gender,
      grad_year: data.grad_year,
      socials: {
        github: data.socials.github,
        facebook: data.socials.facebook,
        linkedin: data.socials.linkedin,
        twitter: data.socials.twitter,
      },
      dob: data.dob.toISOString(),
      image: imageFile,
    },
    auth: true,
  };

  const res = await apiRequest(req);
  if (!res.success) {
    console.error(req.body);
    throw new Error("Failed to update mentor profile");
  }
  console.log("Fake Data Update reached here");
}
