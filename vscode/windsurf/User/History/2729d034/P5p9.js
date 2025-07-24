import { date } from "zod/v4";
import examSchema from "../../shared/examApiSchema.js";
import { createNewExamDB } from "../services/supabase.js";
export async function createNewExam(req, res) {
  const examBody = examSchema.safeParse({
    ...req.body,
    startTime: new Date(req.body.startTime),
  });

  if (examBody.success) {
    const exam = await createNewExamDB(examBody.data);
    res.status(200).json({ success: true, data: exam });
  } else {
    console.log(JSON.stringify(examBody));
    res.status(400).json({ success: false, error: examBody.error });
  }
}
