import {
  db_init,
  fetchAnswerOfQuestionFromDB,
  fetchChoicesOfQuestionFromDB,
  fetchContextOfQuizsetFromDB,
  fetchQuestionsOfQuizsetFromDB,
  fetchQuizsetWithIDFromDB,
} from "../supabase/db";
import {
  AnswerType,
  QuestionType,
  ContextType,
  MCQ_Type,
  QuizSet_Type,
  QuizsetType,
} from "@/app/utils/types";

export async function get_MCQ_quizset(
  quizsetID: string
): Promise<QuizSet_Type> {
  const qs: QuizsetType = await fetchQuizsetWithIDFromDB(quizsetID);
  if (qs) {
    const questions: QuestionType[] = await fetchQuestionsOfQuizsetFromDB(
      quizsetID
    );
    const context: ContextType = await fetchContextOfQuizsetFromDB(quizsetID);
    const assembledQuizzes: Promise<MCQ_Type>[] = questions.map(async (q) => {
      const answer: AnswerType = (await fetchAnswerOfQuestionFromDB(q.id))[0];
      const choices = await fetchChoicesOfQuestionFromDB(q.id);
      if (choices.length !== 4) {
        throw new Error(
          "Error in fetching mcq choices: MCQ question must have 4 choices"
        );
      }
      const quiz: MCQ_Type = {
        question: q,
        answer: answer,
        choices: choices,
      };

      return quiz;
    });

    const resolvedQuizzes = await Promise.all(assembledQuizzes);

    return {
      quizset: qs,
      questions: resolvedQuizzes,
      context: context,
    };
  } else {
    throw new Error("Error fetching quizset");
  }
}

export const get_Total_Question_Count = async (
  user_id: string
): Promise<number> => {
  const supabase = await db_init();
  const { data, error } = await supabase.rpc("get_count_question_by_user", {
    user_id,
  });
  if (error) console.error(error);
  console.log(data);
  return Number(data);
};

export const get_quizset_creator = async (
  quizsetID: string
): Promise<string> => {
  const supabase = await db_init();
  const { data, error } = await supabase
    .from("quizsets")
    .select("userId")
    .eq("id", quizsetID);

  if (error) {
    console.error(error);
    throw new Error("Error fetching quizset creator");
  }
  const creator = data?.[0];
  if (creator) {
    return creator.userId;
  } else {
    return "";
  }
};

export const getTestFromDB = async (testID: string) => {
  const supabase = await db_init();
  const { data, error } = await supabase
    .from("tests")
    .select("*")
    .eq("id", testID);
  if (error) {
    console.error(error);
    throw new Error("Error fetching test");
  }
  console.log(data);
  return data?.[0];
};
