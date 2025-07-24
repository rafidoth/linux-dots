import { wrapWithMutableAccessCheck } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {
  AnswerInsertType,
  MCQ_AI_ResponseType,
  QuestionInsertType,
  QuestionType,
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

export function get_answers_from_ai_response(
  aiResponse: MCQ_AI_ResponseType[],
  questions: QuestionType[]
): AnswerInsertType[] {
  const answers = aiResponse.map((q, i) => {
    return {
      answer: q.answer.toString(),
      answer_explanation: q.answerExplanation,
      questionID: questions[i].id,
    };
  });
  return answers;
}
