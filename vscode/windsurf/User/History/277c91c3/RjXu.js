import { z } from "zod";

const examAPIRequestSchema = z.object({
  title: z.string(),
  creatorId: z.string(),
  creatorParticipationAllowed: z.boolean(),
  shuffleQuestions: z.boolean(),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date string",
  }),
  duration: z.number(),
  quizSetId: z.string(),
  isPublic: z.boolean(),
});

const examSchemas = {
  examAPIRequestSchema,
};

export default examSchemas;
