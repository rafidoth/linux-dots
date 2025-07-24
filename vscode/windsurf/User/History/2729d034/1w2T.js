import { date } from "zod/v4";
import examSchema from "../../shared/examApiSchema.js";
export async function createNewExam(req, res) {
  const examBody = examSchema.safeParse({
    ...req.body,
    date: new Date(req.body.date),
  });

  if (examBody.success) {
    const exam = examBody.data;
    console.log(exam);
    res.status(200).json({ success: true, data: exam });
  } else {
    console.log(JSON.stringify(examBody));
    res.status(400).json({ success: false, error: examBody.error });
  }
}
