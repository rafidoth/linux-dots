import { z } from "zod";
import { StudentInfoSchema } from "./(student)/schemas";
import { MentorInfoSchema } from "./(mentor)/schemas";

export type InterestType = {
  interest_id: string;
  interest_name: string;
};
export type StudentPersonalInfoType = z.infer<typeof StudentInfoSchema>;
export type MentorPersonalInfoType = z.infer<typeof MentorInfoSchema>;

export type meeting_medium = "Online" | "Offline";

export type SessionInfoType = {
  sessionId: string;
  mentorId: string;
  mentorName: string;
  mentorImageLink: string;
  type: SessionType;
  title: string;
  DurationInMinutes: number;
  session_medium: meeting_medium[];
  Description: string;
  Price: number;
};

export type AvalabilityType = {
  id?: string;
  start: Date;
  end: Date;
  booked: boolean;
};

export type SessionType =
  | "Course Topic Tution"
  | "Project Help"
  | "Career Guidance"
  | "Competition Prep"
  | "Productivity"
  | "ECA";

export type mentorleveltype =
  | "beginner guide"
  | "uplifter"
  | "pathfinder"
  | "illuminator"
  | "trailblazer"
  | "grandmaster"
  | "master of art";

export type MentorSuggestionType = {
  mentorId: string;
  name: string;
  organization: string;
  profile_pic: string;
  level: mentorleveltype;
  bio: string;
  sessions_taken: number;
  review_count: number;
};

export type MentorPublicProfileType = {
  mentor_id: string;
  name: string;
  email: string;
  username: string;
  gender: "Male" | "Female";
  dob: Date;
  socials: {
    github: string;
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  organization: string;
  profile_pic: string;
  level: mentorleveltype;
  bio: string;
  interests: InterestType[];
};

export type GroupSessionInfoType = {
  id: string;
  Title: string;
  Description: string;
  DurationInMinutes: number;
  mentorId: string;
  mentorName: string;
  mentorPhotoLink: string;
  participantCount: number;
  participantTotal: number;
};
