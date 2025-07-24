import { wrapWithMutableAccessCheck } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { MCQ_AI_ResponseType, QuestionInsertType } from "./types";

export function get_questions_from_ai_response(
  aiResponse: MCQ_AI_ResponseType
): QuestionInsertType[] {
  return aiResponse.questions.map((q) => ({
    question: q.question,
    answer: q.answer,
    answerExplanation: q.answerExplanation,
    difficulty: q.difficulty,
    questionType: q.questionType,
  }));
}
