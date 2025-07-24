"use client";
import React, { createContext, useState, useContext } from "react";
import { QuizsetType } from "../utils/types";

interface Props {
  children: React.ReactNode;
}

export type QuizsetContextType = {
  Quizsets: QuizsetType[];
  setQuizsets: (QuizsetID: QuizsetType[]) => void;
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
