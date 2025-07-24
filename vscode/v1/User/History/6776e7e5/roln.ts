import { ChoiceType, ContextType } from "./types";
import {
  fetchAnswerOfQuestionFromDB,
  fetchChoicesOfQuestionFromDB,
  fetchContextOfQuizsetFromDB,
  fetchQuestionsOfQuizsetFromDB,
  fetchQuizsetWithIDFromDB,
} from "./db";
import { AnswerType, QuestionType } from "./types";

export async function getQuizset(quizsetID: string) {
  const qs = await fetchQuizsetWithIDFromDB(quizsetID);
  if (qs) {
    const questions: QuestionType[] = await fetchQuestionsOfQuizsetFromDB(
      quizsetID
    );
    const context: ContextType = await fetchContextOfQuizsetFromDB(quizsetID);
    const assembledQuizzes = questions.map(async (q) => {
      const answer: AnswerType = (await fetchAnswerOfQuestionFromDB(q.id))[0];

      if (q.type === "mcq") {
        const choices: ChoiceType[] = await fetchChoicesOfQuestionFromDB(q.id);
      }
    });
  } else {
    throw new Error("Error fetching quizset");
  }
}
