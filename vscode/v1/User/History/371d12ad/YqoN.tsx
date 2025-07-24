"use client";
import React, { createContext, useState, useContext } from "react";
import { QuizsetType } from "../utils/types";

interface Props {
  children: React.ReactNode;
}

export type CurrentQuizsetContextType = {
  Quizset: QuizsetType;
  setQuizset: (Quizset: QuizsetType) => void;
};

const QuizSetContext = createContext<QuizsetContextType>({
  Quizsets: [],
  setQuizsets: () => {},
});

export const QuizSetContextProvider = ({ children }: Props) => {
  const [Quizsets, setQuizsets] = useState<QuizsetType[]>([]);

  return (
    <QuizSetContext.Provider value={{ Quizsets, setQuizsets }}>
      {children}
    </QuizSetContext.Provider>
  );
};

export const useQuizSetCtx = () => useContext(QuizSetContext);
export type CurrentQuizsetContextType = {
  currentQuizset: QuizsetType | null;
  setCurrentQuizset: (quizset: QuizsetType | null) => void;
};

const CurrentQuizsetContext = createContext<CurrentQuizsetContextType>({
  currentQuizset: null,
  setCurrentQuizset: () => {},
});

export const CurrentQuizsetContextProvider = ({ children }: Props) => {
  const [currentQuizset, setCurrentQuizset] = useState<QuizsetType | null>(
    null
  );

  return (
    <CurrentQuizsetContext.Provider
      value={{ currentQuizset, setCurrentQuizset }}
    >
      {children}
    </CurrentQuizsetContext.Provider>
  );
};

export const useCurrentQuizsetCtx = () => useContext(CurrentQuizsetContext);
