import type { Database } from "./supabase";
export type MCQ_AI_ResponseType = {
  question: string;
  choices: string[];
  answer: number;
  answerExplanation: string;
  difficulty: DifficultyType;
  questionType: QuestionTypeType;
};

export type MCQType = {
  question: string;
  choices: string[];
  answer: number;
  answerExplanation: string;
  difficulty: DifficultyType;
};
export type MCQ_Type = {
  question: QuestionType;
  answer: AnswerType;
  choices: ChoiceType[];
};
export type QuizSet_Type = {
  quizset: QuizsetType;
  questions: MCQ_Type[];
  context: ContextType;
};

export type TrueFalseType = {
  question: string;
  answer: boolean;
  answerExplanation: string;
  difficulty: DifficultyType;
};

export type FillInTheBlanksType = {
  question: string;
  answer: string;
  answerExplanation: string;
  difficulty: DifficultyType;
};

export type ShortQuestionType = {
  question: string;
  answer: string;
  answerExplanation: string;
  difficulty: DifficultyType;
};

export type DifficultyType = "easy" | "medium" | "hard";
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

export type AnswerType = Database["public"]["Tables"]["answers"]["Row"];
export type AnswerInsertType =
  Database["public"]["Tables"]["answers"]["Insert"];
export type AnswerUpdateType =
  Database["public"]["Tables"]["answers"]["Update"];

export type QuestionType = Database["public"]["Tables"]["questions"]["Row"];
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
export type QuizsetPageType = {
  quizset: QuizsetType;
  questions: QuizType[];
  context: ContextType;
};

export type QuizsetInsertType =
  Database["public"]["Tables"]["quizsets"]["Insert"];
export type QuizsetUpdateType =
  Database["public"]["Tables"]["quizsets"]["Update"];

export type ContextType = Database["public"]["Tables"]["contexts"]["Row"];
export type ContextInsertType =
  Database["public"]["Tables"]["contexts"]["Insert"];
export type ContextUpdateType =
  Database["public"]["Tables"]["contexts"]["Update"];
