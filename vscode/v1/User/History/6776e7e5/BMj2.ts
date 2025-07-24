import { ChoiceType, ContextType, QuizsetType } from "./types";
import {
  fetchAnswerOfQuestionFromDB,
  fetchChoicesOfQuestionFromDB,
  fetchContextOfQuizsetFromDB,
  fetchQuestionsOfQuizsetFromDB,
  fetchQuizsetWithIDFromDB,
} from "./db";
import { AnswerType, QuestionType } from "./types";

export async function getQuizset(quizsetID: string) {
  const qs: QuizsetType = await fetchQuizsetWithIDFromDB(quizsetID);
  if (qs) {
    const questions: QuestionType[] = await fetchQuestionsOfQuizsetFromDB(
      quizsetID
    );
    const context: ContextType = await fetchContextOfQuizsetFromDB(quizsetID);
    const assembledQuizzes = questions.map(async (q) => {
      const answer: AnswerType = (await fetchAnswerOfQuestionFromDB(q.id))[0];
      let choices: ChoiceType[] = [];
      if (q.type === "mcq") {
        choices = await fetchChoicesOfQuestionFromDB(q.id);
        if (choices.length !== 4) {
          throw new Error(
            "Error in fetching mcq choices : MCQ question must have 4 choices"
          );
        }
      }

      const Quiz = {
        id: q.id,
        question: q.question,
        type: q.type,
        answer: answer.answer,
        choices: choices,
      };
      return Quiz;
    });

    return {
      quizset: qs,
      questions: assembledQuizzes,
      context: context,
    };
  } else {
    throw new Error("Error fetching quizset");
  }
}
