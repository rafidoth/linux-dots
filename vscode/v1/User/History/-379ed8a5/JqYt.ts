import { wrapWithMutableAccessCheck } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { MCQ_AI_ResponseType, QuestionInsertType } from "./types";

export function get_questions_from_ai_response(
  aiResponse: MCQ_AI_ResponseType[],quizsetID: string
): QuestionInsertType[] {
  const questions = aiResponse.map((q) => {
    return {
      question: q.question,
      quizsetID: q.
    };
  });
}
