import { createNewExamDB } from "../services/supabase.js";
import examSchemas from "../../shared/examApiSchema.js";
export async function createNewExam(req, res) {
  const examBody = examSchemas.examAPIRequestSchema.safeParse(req.body);

  console.log("examBody", examBody);
  if (examBody.success) {
    const exam = await createNewExamDB(examBody.data);
    res.status(200).json({ success: true, data: exam });
  } else {
    console.log(JSON.stringify(examBody));
    res.status(400).json({ success: false, error: examBody.error });
  }
}
