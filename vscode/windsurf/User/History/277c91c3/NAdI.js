import { z } from "zod";

const examSchema = z.object({
  title: z.string(),
  creatorId: z.string(),
  creatorParticipationAllowed: z.boolean(),
  shuffleQuestions: z.boolean(),
  startTime: z.date(),
  duration: z.number(),
  quizSetId: z.string(),
  isPublic: z.boolean(),
});

export default examSchema;
