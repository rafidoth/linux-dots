import { db_init } from "../supabase/db";
type TestChoiceType = {
  id: string;
  choiceText: string;
};

type TestQuestionType = {
  id: string;
  question: string;
};

export type SingleQuizInTest = {
  question: TestQuestionType;
  options: TestChoiceType[];
};

export async function getQuizzes(quizsetID: string) {
  const db = await db_init();
  const { data, error } = await db
    .from("questions")
    .select("id,question")
    .eq("quizsetID", quizsetID);
  if (error) {
    console.error(error);
    throw new Error("Error fetching questions");
  }

  if (data) {
    const quizzes_promises = data.map(async (quiz) => {
      const { data, error } = await db
        .from("choices")
        .select("id,choiceText")
        .eq("questionID", quiz.id);

      if (error) {
        console.error(error);
        throw new Error("Error fetching choices");
      }

      const options = data!.map((choice) => {
        return {
          id: choice.id,
          choiceText: choice.choiceText,
        };
      });
      const q: SingleQuizInTest = {
        question: quiz,
        options: options,
      };
      console.log(q);
      return q;
    });

    const resolvedQuizzes: SingleQuizInTest[] = await Promise.all(
      quizzes_promises
    );
    return resolvedQuizzes;
  } else {
    return null;
  }
}
