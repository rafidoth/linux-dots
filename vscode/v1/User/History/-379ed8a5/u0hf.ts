import { wrapWithMutableAccessCheck } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {
  MCQ_AI_ResponseType,
  QuestionInsertType,
  QuestionTypeType,
} from "./types";

export function get_questions_from_ai_response(
  aiResponse: MCQ_AI_ResponseType[],
  quizsetID: string,
  questionType: QuestionTypeType
): QuestionInsertType[] {
  const questions = aiResponse.map((q) => {
    return {
      question: q.question,
      quizsetID: quizsetID,
      type: questionType,
      difficulty: q.difficulty,
    };
  });
  return questions;
}
