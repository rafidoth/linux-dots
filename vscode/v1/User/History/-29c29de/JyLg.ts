import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/app/supabase/supabase";
import {
  UserType,
  AnswerInsertType,
  QuizsetInsertType,
  QuestionInsertType,
  QuestionTypeType,
  QuizsetType,
  QuestionType,
  MCQType,
  ChoiceInsertType,
  ContextInsertType,
  MCQ_AI_ResponseType,
} from "@/app/utils/types";

export async function db_init() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase URL or Supabase Anon Key not found in environment variables"
    );
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export async function createUser(user: UserType) {
  const db = await db_init();

  const { error } = await db.from("users").insert({
    userid: user.userId,
    email: user.email,
    role: user.role,
    imageUrl: user.imageUrl,
    createdat: user.createdAt,
    firstName: user.firstName,
    lastName: user.lastName,
  });
  console.log("user insertion error", error);
}

export async function insertAnswer(answer: AnswerInsertType) {
  const db = await db_init();
  const { data, error } = await db.from("answers").insert(answer).select();
  if (error) {
    console.error(answer);
    console.error("answer insertion error", error);
    throw new Error(
      "Error inserting answer : returned error from insert command"
    );
  }
  console.log("answer insertion data", data);
  return data[0];
}

export async function insertQuizset(quizset: QuizsetInsertType) {
  const db = await db_init();
  const { data, error } = await db.from("quizsets").insert(quizset).select();
  if (error) {
    console.error("quizset insertion error", error);
    throw new Error(
      "Error inserting quizset : returned error from insert command"
    );
  }
  return data[0];
}

export async function insertQuestion(question: QuestionInsertType) {
  const db = await db_init();
  const { data, error } = await db.from("questions").insert(question).select();

  if (error) {
    console.error(question);
    console.error("question insertion error", error);
    throw new Error(
      "Error inserting question: returned error from insert command"
    );
  }
  console.log("question insertion data", data);
  return data[0];
}

export async function insertChoice(choice: ChoiceInsertType) {
  const db = await db_init();
  const { data, error } = await db.from("choices").insert(choice).select();
  if (error) {
    console.error(choice);
    console.error("choice insertion error", error);
    throw new Error(
      "Error inserting choice: returned error from insert command"
    );
  }
  console.log("choice insertion data", data);
  return data[0];
}

export async function insertContext(context: ContextInsertType) {
  const db = await db_init();
  const { data, error } = await db.from("contexts").insert(context).select();
  if (error) {
    console.error(context);
    console.error("context insertion error", error);
    throw new Error(
      "Error inserting context: returned error from insert command"
    );
  }
  console.log("context insertion data", data);
  return data[0];
}

export async function saveMCQtoDB(
  quiz: MCQ_AI_ResponseType[],
  questionType: QuestionTypeType,
  context: string,
  userId: string,
  quizsetId?: string
) {
  let set: QuizsetType;
  if (!quizsetId) {
    // creaing a new quizset
    const quizset: QuizsetInsertType = {
      title: context.slice(0, 30),
      userId: userId,
      visibility: "private",
    };
    set = await insertQuizset(quizset);
    if (!set) {
      throw new Error(
        "Error inserting quizset : returned data from insert command is NULL"
      );
    }
    const setID = set.id;

    //creating a new context for the quizset
    if (context.length > 0) {
      const ctx: ContextInsertType = {
        content: context,
        quizsetID: setID,
      };
      await insertContext(ctx);
    }
  } else {
    // using existing quizset
    set = await fetchQuizsetWithIDFromDB(quizsetId);
  }
  const setID = set.id;
  quiz.forEach(async (q) => {
    const question: QuestionInsertType = {
      question: q.question,
      quizsetID: setID,
      difficulty: q.difficulty,
      type: questionType,
    };
    const retQues: QuestionType = await insertQuestion(question);
    if (!retQues) {
      throw new Error(
        "Error inserting question : returned data from insert command is NULL"
      );
    }
    const qID: string = retQues.id;
    const qType: QuestionTypeType = retQues.type;

    if (qType === "mcq") {
      const qCopy = q as MCQType;
      const ans: AnswerInsertType = {
        answer: qCopy.answer.toString(),
        answer_explanation: qCopy.answerExplanation,
        questionID: qID,
      };
      await insertAnswer(ans);

      qCopy.choices.forEach(async (c, i) => {
        const choice: ChoiceInsertType = {
          choiceText: c,
          choiceNumber: i,
          questionID: qID,
        };
        await insertChoice(choice);
      });
    } else {
      const ans: AnswerInsertType = {
        answer: q.answer.toString(),
        answer_explanation: q.answerExplanation,
        questionID: qID,
      };
      await insertAnswer(ans);
    }
  });

  console.log("Quizset saved to DB");
  return set;
}

export async function fetchQuizSetsOfUserFromDB(userId: string) {
  const db = await db_init();
  const { data, error } = await db
    .from("quizsets")
    .select()
    .eq("userId", userId);

  if (error) {
    console.error("quizset fetch error", error);
    throw new Error(
      "Error fetching quizset : returned error from select command"
    );
  }
  return data;
}

export async function fetchQuizsetWithIDFromDB(quizsetID: string) {
  const db = await db_init();
  const { data, error } = await db
    .from("quizsets")
    .select()
    .eq("id", quizsetID);

  if (error) {
    console.error("quizset fetch error", error);
    throw new Error(
      "Error fetching quizset : returned error from select command"
    );
  }
  console.log("quizset fetch data", data);
  return data[0];
}

export async function fetchQuestionsOfQuizsetFromDB(quizsetID: string) {
  const db = await db_init();
  const { data, error } = await db
    .from("questions")
    .select()
    .eq("quizsetID", quizsetID);

  if (error) {
    console.error("questions fetch error", error);
    throw new Error(
      "Error fetching questions : returned error from select command"
    );
  }
  console.log("questions fetch data", data);
  return data;
}

export async function fetchAnswerOfQuestionFromDB(questionID: string) {
  const db = await db_init();
  const { data, error } = await db
    .from("answers")
    .select()
    .eq("questionID", questionID);

  if (error) {
    console.error("answers fetch error", error);
    throw new Error(
      "Error fetching answers : returned error from select command"
    );
  }
  console.log("answers fetch data", data);
  return data;
}

export async function fetchChoicesOfQuestionFromDB(questionID: string) {
  const db = await db_init();
  const { data, error } = await db
    .from("choices")
    .select()
    .eq("questionID", questionID);

  if (error) {
    console.error("choices fetch error", error);
    throw new Error(
      "Error fetching choices : returned error from select command"
    );
  }
  return data;
}

export async function fetchContextOfQuizsetFromDB(quizsetID: string) {
  const db = await db_init();
  const { data, error } = await db
    .from("contexts")
    .select()
    .eq("quizsetID", quizsetID);

  if (error) {
    console.error("context fetch error", error);
    throw new Error(
      "Error fetching context : returned error from select command"
    );
  }
  console.log("context fetch data", data);
  return data[0];
}
