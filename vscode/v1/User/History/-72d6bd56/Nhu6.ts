import { randomUUID } from "crypto";
import { MentorSuggestionType, SessionType } from "../types";

export const FakeStudentInfo = {
  name: "S Rafiul Hasan",
  email: "rafiulhasan803@gmail.com",
  username: "rafidoth",
  gender: "Female",
  dob: new Date("2000-01-01T00:00:00.000Z"),
  graduation_year: 2079,
};

export const FakeMentorInfo = {
  name: "S Rafiul Hasan",
  email: "rafiulhasan803@gmail.com",
  username: "rafidoth",
  gender: "Male",
  dob: new Date("2000-01-01T00:00:00.000Z"),
  socials: {
    github: "github.com/rafidoth",
    facebook: null,
    linkedin: null,
    twitter: null,
  },
  organization: "United International University",
  profile_pic:
    "https://avatars.githubusercontent.com/u/67283985?s=400&u=785ba4e71821a24fee9df89190cbfab208e72dd3&v=4",
  bio: "Golang | JS | AWS | Scalable System Development ",
};

// export const FakeMentorListBasedOnStudentInterest = [
//   {
//     mentorId: "fakeMentor1",
//     name: "S Rafiul Hasan",
//     organization: "UIU",
//     profile_pic:
//       "https://avatars.githubusercontent.com/u/67283985?s=400&u=785ba4e71821a24fee9df89190cbfab208e72dd3&v=4",
//     level: "Pathfinder",
//   },
// ];
export const FakeMentorList: MentorSuggestionType[] = [
  {
    mentorId: "fakeMentor1",
    name: "John Doe",
    organization: "United International University",
    profile_pic: "https://i.pravatar.cc/300?img=8",
    level: "beginner guide",
    bio: "Java | SWE Intern at XYZ | Hackathon Winner",
    sessions_taken: 41,
    review_count: 25,
  },
  {
    mentorId: "fakeMentor2",
    name: "Jane Smith",
    organization: "United International University",
    profile_pic: "https://i.pravatar.cc/300?img=7",
    level: "uplifter",
    bio: "Python | Data Scientist | AI Competition Finalist",
    sessions_taken: 32,
    review_count: 18,
  },
  {
    mentorId: "fakeMentor3",
    name: "Alice Johnson",
    organization: "United International University",
    profile_pic: "https://i.pravatar.cc/300?img=1",
    level: "pathfinder",
    bio: "Full Stack Developer | Coding Olympiad Champion",
    sessions_taken: 50,
    review_count: 30,
  },
  {
    mentorId: "fakeMentor4",
    name: "Bob Brown",
    organization: "CyberTech Solutions",
    profile_pic: "https://i.pravatar.cc/300?img=2",
    level: "illuminator",
    bio: "Cybersecurity Expert | CTF Winner",
    sessions_taken: 28,
    review_count: 15,
  },
  {
    mentorId: "fakeMentor5",
    name: "Charlie Davis",
    organization: "United International University",
    profile_pic: "https://i.pravatar.cc/300?img=3",
    level: "trailblazer",
    bio: "Blockchain Developer | Hackathon Runner-up",
    sessions_taken: 35,
    review_count: 20,
  },
  {
    mentorId: "fakeMentor6",
    name: "Diana Evans",
    organization: "Creative Design Studio",
    profile_pic: "https://i.pravatar.cc/300?img=4",
    level: "master of art",
    bio: "UI/UX Designer | Design Competition Winner",
    sessions_taken: 40,
    review_count: 22,
  },
  {
    mentorId: "fakeMentor7",
    name: "Ethan Foster",
    organization: "United International University",
    profile_pic: "https://i.pravatar.cc/300?img=5",
    level: "grandmaster",
    bio: "AI Researcher | Innovation Award Winner",
    sessions_taken: 60,
    review_count: 35,
  },
  {
    mentorId: "fakeMentor8",
    name: "Fiona Green",
    organization: "United International University",
    profile_pic: "https://i.pravatar.cc/300?img=6",
    level: "beginner guide",
    bio: "Frontend Developer | Web Design Contest Finalist",
    sessions_taken: 25,
    review_count: 12,
  },
  {
    mentorId: "fakeMentor9",
    name: "George Harris",
    organization: "Data Insights Inc.",
    profile_pic: "https://i.pravatar.cc/300?img=9",
    level: "uplifter",
    bio: "Data Analyst | Data Science Hackathon Winner",
    sessions_taken: 38,
    review_count: 19,
  },
  {
    mentorId: "fakeMentor10",
    name: "Hannah White",
    organization: "United International University",
    profile_pic: "https://i.pravatar.cc/300?img=10",
    level: "pathfinder",
    bio: "Mobile App Developer | App Challenge Winner",
    sessions_taken: 45,
    review_count: 28,
  },
  {
    mentorId: "fakeMentor11",
    name: "Ian King",
    organization: "Cloud Innovators",
    profile_pic: "https://i.pravatar.cc/300?img=11",
    level: "illuminator",
    bio: "Cloud Engineer | Cloud Innovation Award Winner",
    sessions_taken: 30,
    review_count: 16,
  },
  {
    mentorId: "fakeMentor12",
    name: "Jessica Lee",
    organization: "United International University",
    profile_pic: "https://i.pravatar.cc/300?img=12",
    level: "trailblazer",
    bio: "Machine Learning Engineer | AI Hackathon Finalist",
    sessions_taken: 42,
    review_count: 24,
  },
  {
    mentorId: "fakeMentor13",
    name: "Kevin Martinez",
    organization: "United International University",
    profile_pic: "https://i.pravatar.cc/300?img=13",
    level: "master of art",
    bio: "Game Developer | Game Jam Winner",
    sessions_taken: 36,
    review_count: 21,
  },
  {
    mentorId: "fakeMentor14",
    name: "Laura Nelson",
    organization: "United International University",
    profile_pic: "https://i.pravatar.cc/300?img=14",
    level: "grandmaster",
    bio: "Robotics Expert | Robotics Competition Winner",
    sessions_taken: 55,
    review_count: 33,
  },
  {
    mentorId: "fakeMentor15",
    name: "Michael Scott",
    organization: "Marketing Gurus Ltd.",
    profile_pic: "https://i.pravatar.cc/300?img=15",
    level: "beginner guide",
    bio: "Marketing Specialist | Marketing Challenge Winner",
    sessions_taken: 20,
    review_count: 10,
  },
];

export const FakeGetSessionsMentor = {
  sessionId: "fake-session-id",
  mentorId: "fakeMentorId",
  title: "SPL Midterm Question Solve Session",
  DurationInMinutes: 120,
  session_medium: ["Online", "Offline"],
  Description: `
    - Previous two trimester question solving live
    - 1 set Practice Question with solution
  `,
  Price: 500,
};
export const getFakeSessionInfo = (title: string) => {
  return {
    sessionId: randomUUID(),
    mentorId: "fakeMentorId",
    title: title,
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  };
};

export const getFakeSessionsForStudent = (
  title: string,
  type: SessionType,
  description?: string
) => {
  return {
    sessionId: randomUUID(),
    mentorId: "fakeMentorId",
    mentorName: "S Rafiul Hasan",
    mentorImageLink:
      "https://avatars.githubusercontent.com/u/67283985?s=400&u=785ba4e71821a24fee9df89190cbfab208e72dd3&v=4",
    type: type,
    title: title,
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: description
      ? description
      : `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  };
};

export const fakeSessionsSuggestionStudentDashboard = [
  {
    sessionId: randomUUID(),
    mentorId: "fakeMentorId",
    mentorName: "S Rafiul Hasan",
    mentorImageLink:
      "https://avatars.githubusercontent.com/u/67283985?s=400&u=785ba4e71821a24fee9df89190cbfab208e72dd3&v=4",
    type: "Course Topic Tution",
    title: "Physics Mid term preparation",
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  },
  {
    sessionId: randomUUID(),
    mentorId: "fakeMentor1",
    mentorName: "John Doe",
    mentorImageLink: "https://i.pravatar.cc/300?img=1",
    type: "Course Topic Tution",
    title: "OOP Mid Term Preparation",
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  },
  {
    sessionId: randomUUID(),
    mentorId: "fakeMentor2",
    mentorName: "Jane Smith",
    mentorImageLink: "https://i.pravatar.cc/300?img=2",
    type: "Project Help",
    title: "Data Structures Project Help",
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  },
  {
    sessionId: randomUUID(),
    mentorId: "fakeMentor3",
    mentorName: "Alice Johnson",
    mentorImageLink: "https://i.pravatar.cc/300?img=3",
    type: "Career Guidance",
    title: "Career Guidance for Freshers",
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  },
  {
    sessionId: randomUUID(),
    mentorId: "fakeMentor4",
    mentorName: "Bob Brown",
    mentorImageLink: "https://i.pravatar.cc/300?img=4",
    type: "Competition Prep",
    title: "Blockchain Olympiad Preparation",
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  },
  {
    sessionId: randomUUID(),
    mentorId: "fakeMentor5",
    mentorName: "Charlie Davis",
    mentorImageLink: "https://i.pravatar.cc/300?img=5",
    type: "Productivity",
    title: "Time Management Workshop",
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  },
  {
    sessionId: randomUUID(),
    mentorId: "fakeMentor6",
    mentorName: "Diana Evans",
    mentorImageLink: "https://i.pravatar.cc/300?img=6",
    type: "ECA",
    title: "ECA Club Leadership Training",
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  },
  {
    sessionId: randomUUID(),
    mentorId: "fakeMentor7",
    mentorName: "Ethan Foster",
    mentorImageLink: "https://i.pravatar.cc/300?img=7",
    type: "Course Topic Tution",
    title: "SQL Crash Course",
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  },
  {
    sessionId: randomUUID(),
    mentorId: "fakeMentor8",
    mentorName: "Fiona Green",
    mentorImageLink: "https://i.pravatar.cc/300?img=8",
    type: "Career Guidance",
    title: "AI Research Guidance",
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  },
  {
    sessionId: randomUUID(),
    mentorId: "fakeMentor9",
    mentorName: "George Harris",
    mentorImageLink: "https://i.pravatar.cc/300?img=9",
    type: "Competition Prep",
    title: "Hackathon Preparation",
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  },
  {
    sessionId: randomUUID(),
    mentorId: "fakeMentor10",
    mentorName: "Hannah White",
    mentorImageLink: "https://i.pravatar.cc/300?img=10",
    type: "Productivity",
    title: "Stress Management Techniques",
    DurationInMinutes: 120,
    session_medium: ["Online", "Offline"],
    Description: `Previous two trimester question solving live and 1 set Practice Question with solution`,
    Price: 500,
  },
];

export const mentorAvailableAt = [
  {
    id: 1,
    start: new Date("2025-03-25T09:43:44.000Z"),
    end: new Date("2025-03-25T11:15:44.000Z"),
    booked: false,
  },
  {
    id: 2,
    start: new Date("2025-03-28T10:20:44.000Z"),
    end: new Date("2025-03-28T12:00:44.000Z"),
    booked: false,
  },
  {
    id: 3,
    start: new Date("2025-03-26T08:00:44.000Z"),
    end: new Date("2025-03-26T10:00:44.000Z"),
    booked: false,
  },
  {
    id: 4,
    start: new Date("2025-03-25T12:30:00.000Z"),
    end: new Date("2025-03-25T14:00:00.000Z"),
    booked: false,
  },
  {
    id: 5,
    start: new Date("2025-03-28T14:30:00.000Z"),
    end: new Date("2025-03-28T16:00:00.000Z"),
    booked: false,
  },
  {
    id: 6,
    start: new Date("2025-03-26T11:00:00.000Z"),
    end: new Date("2025-03-26T12:30:00.000Z"),
    booked: false,
  },
  {
    id: 7,
    start: new Date("2025-03-25T15:00:00.000Z"),
    end: new Date("2025-03-25T17:30:00.000Z"),
    booked: false,
  },
  {
    id: 8,
    start: new Date("2025-03-28T16:30:00.000Z"),
    end: new Date("2025-03-28T19:00:00.000Z"),
    booked: false,
  },
  {
    id: 9,
    start: new Date("2025-03-26T13:00:00.000Z"),
    end: new Date("2025-03-26T15:30:00.000Z"),
    booked: false,
  },
];

export const fakeAvailabilities = [
  {
    id: 1,
    start: new Date("2025-03-25T09:43:44.000Z"),
    end: new Date("2025-03-25T11:15:44.000Z"),
    booked: true,
  },
  {
    id: 2,
    start: new Date("2025-03-28T10:20:44.000Z"),
    end: new Date("2025-03-28T12:00:44.000Z"),
    booked: false,
  },
  {
    id: 3,
    start: new Date("2025-03-26T08:00:44.000Z"),
    end: new Date("2025-03-26T10:00:44.000Z"),
    booked: false,
  },
];

// name: z.string(),
// email: z.string(),
// username: z.string(),
// gender: genderSchema,
// dob: z.date(),
// graduation_year: z.number(),

export const single_student_interests = [
  {
    interest_id: "4ea784ee-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Artificial Intelligence & Deep Learning",
  },
  {
    interest_id: "4ea7a33a-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Animation & Motion Graphics",
  },
  {
    interest_id: "4ea7a453-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Aerospace & Automotive Engineering",
  },
];

export const All_Interests = [
  {
    interest_id: "4ea7a453-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Aerospace & Automotive Engineering",
  },
  {
    interest_id: "4ea7a33a-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Animation & Motion Graphics",
  },
  {
    interest_id: "4ea784ee-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Artificial Intelligence & Deep Learning",
  },
  {
    interest_id: "4ea78379-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Backend Development",
  },
  {
    interest_id: "4ea7a10d-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Biotechnology & Biotech Startups",
  },
  {
    interest_id: "4ea78536-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Blockchain & Cryptocurrency",
  },
  {
    interest_id: "4ea7a085-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Business Analytics",
  },
  {
    interest_id: "4ea7a1eb-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Career Switching & Growth Strategy",
  },
  {
    interest_id: "4ea78611-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Competitive Programming & Algorithms",
  },
  {
    interest_id: "4ea7a2d1-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Conflict Resolution & Negotiation",
  },
  {
    interest_id: "4ea7a3bd-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Copywriting & Content Strategy",
  },
  {
    interest_id: "4ea78515-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Cybersecurity & Ethical Hacking",
  },
  {
    interest_id: "4ea784c4-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Data Analysis & Visualization",
  },
  {
    interest_id: "4ea784a0-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Data Science & Machine Learning",
  },
  {
    interest_id: "4ea78582-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "DevOps & Cloud Computing",
  },
  {
    interest_id: "4ea7a03d-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Digital Marketing & SEO",
  },
  {
    interest_id: "4ea79f91-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "E-commerce & Dropshipping",
  },
  {
    interest_id: "4ea7a152-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Economics & Business Analytics",
  },
  {
    interest_id: "4ea785ef-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Embedded Systems & Hardware Programming",
  },
  {
    interest_id: "4ea7a0c7-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Engineering",
  },
  {
    interest_id: "4ea7a560-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Ethical Hacking & Digital Forensics",
  },
  {
    interest_id: "4ea79f13-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Finance & Investment",
  },
  {
    interest_id: "4ea7a4f9-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Fitness, Health & Nutrition",
  },
  {
    interest_id: "4ea7a26f-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Freelancing & Remote Work",
  },
  {
    interest_id: "4ea75b70-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Frontend Development",
  },
  {
    interest_id: "4ea7841b-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Full Stack Development",
  },
  {
    interest_id: "4ea7a35a-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Game Art & Game Design",
  },
  {
    interest_id: "4ea78477-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Game Development",
  },
  {
    interest_id: "4ea7a2f4-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Graphic Design",
  },
  {
    interest_id: "4ea79ffa-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Growth Hacking",
  },
  {
    interest_id: "4ea7855d-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Internet of Things (IoT)",
  },
  {
    interest_id: "4ea7a4b9-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Language Learning",
  },
  {
    interest_id: "4ea7a12f-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Law & Legal Studies",
  },
  {
    interest_id: "4ea7a062-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Leadership & Team Management",
  },
  {
    interest_id: "4ea7a51e-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Life Coaching & Personal Development",
  },
  {
    interest_id: "4ea79fba-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Marketing & Branding",
  },
  {
    interest_id: "4ea7a171-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Mathematics & Statistics",
  },
  {
    interest_id: "4ea7a495-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Mechanical CAD & 3D Printing",
  },
  {
    interest_id: "4ea7a0eb-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Medical & Healthcare",
  },
  {
    interest_id: "4ea7a53f-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Meditation & Mindfulness",
  },
  {
    interest_id: "4ea78451-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Mobile App Development",
  },
  {
    interest_id: "4ea7a4da-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Music Production & Audio Engineering",
  },
  {
    interest_id: "4ea7a28f-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Personal Branding & Networking",
  },
  {
    interest_id: "4ea7a24f-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Personal Finance & Wealth Management",
  },
  {
    interest_id: "4ea7a37a-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Photography & Cinematography",
  },
  {
    interest_id: "4ea7a3de-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Podcasting & Voiceover",
  },
  {
    interest_id: "4ea7a01c-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Product Management",
  },
  {
    interest_id: "4ea7a190-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Psychology & Mental Health",
  },
  {
    interest_id: "4ea7a20c-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Public Speaking & Communication Skills",
  },
  {
    interest_id: "4ea7a41e-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Renewable Energy & Sustainability",
  },
  {
    interest_id: "4ea7a1b0-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Resume Building & Interview Preparation",
  },
  {
    interest_id: "4ea7a3fd-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Robotics & Automation",
  },
  {
    interest_id: "4ea79fdb-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Sales & Negotiation",
  },
  {
    interest_id: "4ea7a0a6-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Scientific Research & Publishing",
  },
  {
    interest_id: "4ea7a473-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Semiconductor & Chip Design",
  },
  {
    interest_id: "4ea785cd-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Software Testing & Quality Assurance",
  },
  {
    interest_id: "4ea78631-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Startup & Business Strategy",
  },
  {
    interest_id: "4ea7a22e-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Time Management & Productivity",
  },
  {
    interest_id: "4ea785a7-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "UI/UX Design & Product Design",
  },
  {
    interest_id: "4ea79f6c-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Venture Capital & Fundraising",
  },
  {
    interest_id: "4ea7a318-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Video Editing & Content Creation",
  },
  {
    interest_id: "4ea71a83-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Web Development",
  },
  {
    interest_id: "4ea7a2af-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Workplace Ethics & Professionalism",
  },
  {
    interest_id: "4ea7a399-fd1a-11ef-b7b8-55e0634d59d9",
    interest_name: "Writing & Blogging",
  },
];
