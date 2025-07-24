import type { QueryError } from "@supabase/supabase-js";
export interface QuizType {
  question: string;
  answer: number;
  answerExplanation: string;
  choices: string[];
}

export type UserType = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  imageUrl: string;
  createdAt: string;
};

export type Err = QueryError;
