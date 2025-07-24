import {
  ChoiceType,
  ContextType,
  MCQType,
  QuizsetType,
  QuizType,
} from "./types";
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
      if (q.type === "mcq") {
        const choices = await fetchChoicesOfQuestionFromDB(q.id);
        if (choices.length !== 4) {
          throw new Error(
            "Error in fetching mcq choices : MCQ question must have 4 choices"
          );
        }
        const choice_number: number = Number(answer.answer);
        if (
          Number.isNaN(choice_number) ||
          choice_number < 0 ||
          choice_number > 3
        ) {
          throw new Error(
            "Error in fetching mcq choices : Answer must be between 0 and 3 or the choice is not a number"
          );
        }

        const Quiz: MCQType = {
          question: q.question,
          answer: choice_number,
          answerExplanation: answer.answer_explanation || "",
          difficulty: q.difficulty,
          choices: choices.map((c) => c.choiceText),
        };
        return Quiz;
      } else {
        return null;
      }
    });

    return {
      quizset: qs,
      questions: (await Promise.all(assembledQuizzes)) as QuizType[],
      context: context,
    };
  } else {
    throw new Error("Error fetching quizset");
  }
}
