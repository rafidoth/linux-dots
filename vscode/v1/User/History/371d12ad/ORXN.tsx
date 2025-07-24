"use client";
import React, { createContext, useState, useContext } from "react";
import { QuizSet_Type } from "../utils/types";

interface Props {
  children: React.ReactNode;
}

export type CurrentQuizsetContextType = {
  currentQuizset: QuizSet_Type;
  setCurrentQuizset: (quizset: QuizSet_Type) => void;
};

const initialValue: QuizSet_Type = {
  quizset: {
    id: "",
    title: "",
    userId: "",
    visibility: "public",
    created_at: "",
  },
  questions: [],
  context: {
    content: "",
    created_at: "",
    id: "",
    quizsetID: "",
  },
};

const CurrentQuizsetContext = createContext<CurrentQuizsetContextType>({
  currentQuizset: initialValue,
  setCurrentQuizset: () => {},
});

export const CurrentQuizsetContextProvider = ({ children }: Props) => {
  const [currentQuizset, setCurrentQuizset] =
    useState<QuizSet_Type>(initialValue);

  return (
    <CurrentQuizsetContext.Provider
      value={{ currentQuizset, setCurrentQuizset }}
    >
      {children}
    </CurrentQuizsetContext.Provider>
  );
};

export const useCurrentQuizsetCtx = () => useContext(CurrentQuizsetContext);
