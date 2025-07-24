import { z } from "zod";

const examSchema = z.object({
  title: z.string(),
  creatorId: z.string(),
  creatorParticipationAllowed: z.boolean(),
  startTime: z.date(),
  duration: z.number(),
  timeType: z.enum(["fixed", "relative"]),
  quizSetId: z.string(),
  isPublic: z.boolean(),
  shuffleQuestions: z.boolean(),
  showResultsAfter: z.enum(["afterDeadline", "afterCompletion"]),
});
export default examSchema;
