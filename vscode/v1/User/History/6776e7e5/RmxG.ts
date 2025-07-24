import { fetchQuestionsOfQuizsetFromDB, fetchQuizsetWithIDFromDB } from "./db";
import { AnswerType, QuestionType } from "./types";

export async function getQuizset(quizsetID: string) {
  const qs = await fetchQuizsetWithIDFromDB(quizsetID);
  if (qs) {
    const questions: QuestionType[] = await fetchQuestionsOfQuizsetFromDB(
      quizsetID
    );
    const assembledQuizzes = questions.map((q) => {
      const answer: AnswerType = await fetch;
    });
  } else {
    throw new Error("Error fetching quizset");
  }
}
