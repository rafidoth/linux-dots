import {
  checkExamParticipantStatus,
  createNewExamDB,
  getExamsByQuizset,
  isExamCreator,
  isExamParticipant,
} from "../services/supabase.js";
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

export async function getExamsByQuizsetController(req, res) {
  try {
    const userId = req.headers["x-user-id"];
    const { quizsetId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    const exams = await getExamsByQuizset(quizsetId, userId);

    res.status(200).json({
      success: true,
      data: exams,
    });
  } catch (error) {
    console.error("Error in getExamsByQuizsetController:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch exams for quizset",
    });
  }
}

export async function getParticipationStatus(req, res) {
  const { examId } = req.body;
  const userId = req.headers["x-user-id"];

  if (!examId || !userId) {
    return res.status(400).json({
      success: false,
      error: "Exam ID and User ID are required",
    });
  }

  const isExamParticipant = await checkExamParticipantStatus(examId, userId);

  if (isExamParticipant) {
    return res.status(200).json({
      status: "participant",
    });
  } else {
    const isExamCreator = await isExamCreator(examId, userId);
    if (isExamCreator) {
      return res.status(200).json({
        status: "creator",
      });
    }
    return res.status(403).json({
      status: "not participant",
    });
  }
}
