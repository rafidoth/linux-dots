import { z } from "zod";

export const genderSchema = z.enum(["Male", "Female"]);
// {
//     "name": "new mentor 3",
//     "email": "newmentor3@gmail.com",
//     "username": "newmentor3",
//     "gender": "Female",
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
});
