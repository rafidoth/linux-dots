import { z } from "zod";

export const genderSchema = z.enum(["Male", "Female"]);
// {
//     "user_id": "aadc9073-c3d3-417d-b36d-dddf488409b4",
//     "name": "new mentor 3",
//     "email": "newmentor3@gmail.com",
//     "username": "newmentor3",
//     "gender": "Female",
//     "mentor_id": "0e6acaed-8ee5-4611-a5d9-706f5df411ab",
//     "bio": "Deep Learning",
//     "social_link": "github.com/emni3",
//     "organization": "UIU",
//     "is_approved": 0
// }

export const MentorInfoSchema = z.object({
  name: z.string(),
  email: z.string(),
  username: z.string(),
  gender: genderSchema,
  dob: z.date(),
  graduation_year: z.number(),
});
