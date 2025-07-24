import type { QueryError } from "@supabase/supabase-js";
import type { Database } from "./supabase";
// export interface QuizType {
//   question: string;
//   answer: number;
//   answerExplanation: string;
//   choices: string[];
// }

export type MCQType = {
  question: string;
  choices: string[];
  answer: number;
  answerExplanation: string;
};
export type TrueFalseType = {
  question: string;
  answer: boolean;
  answerExplanation: string;
};

export type FillInTheBlanksType = {
  question: string;
  answer: string;
  answerExplanation: string;
};
export type ShortQuestionType = {
  question: string;
  answer: string;
  answerExplanation: string;
};
export type QuestionTypeType =
  | "mcq"
  | "truefalse"
  | "fillintheblanks"
  | "short";
export type QuizType =
  | MCQType
  | TrueFalseType
  | FillInTheBlanksType
  | ShortQuestionType;

export type UserType = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  imageUrl: string;
  createdAt: string;
};

export type AnswerInsertType =
  Database["public"]["Tables"]["answers"]["Insert"];
export type AnswerUpdateType =
  Database["public"]["Tables"]["answers"]["Update"];
export type QuestionInsertType =
  Database["public"]["Tables"]["questions"]["Insert"];
export type QuestionUpdateType =
  Database["public"]["Tables"]["questions"]["Update"];

export type ChoiceType = Database["public"]["Tables"]["choices"]["Row"];
export type ChoiceInsertType =
  Database["public"]["Tables"]["choices"]["Insert"];
export type ChoiceUpdateType =
  Database["public"]["Tables"]["choices"]["Update"];

export type QuizsetType = Database["public"]["Tables"]["quizsets"]["Row"];
export type QuizsetInsertType =
  Database["public"]["Tables"]["quizsets"]["Insert"];
export type QuizsetUpdateType =
  Database["public"]["Tables"]["quizsets"]["Update"];
