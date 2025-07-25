"use client";
import React, { createContext, useState, useContext } from "react";
import { QuizSet_Type, QuizsetPageType, QuizsetType } from "../utils/types";

interface Props {
  children: React.ReactNode;
}

export type CurrentQuizsetContextType = {
  currentQuizset: QuizsetPageType | null;
  setCurrentQuizset: (quizset: QuizsetPageType | null) => void;
};

const CurrentQuizsetContext = createContext<CurrentQuizsetContextType>({
  currentQuizset: null,
  setCurrentQuizset: () => {},
});

export const CurrentQuizsetContextProvider = ({ children }: Props) => {
  const [currentQuizset, setCurrentQuizset] = useState<QuizSet_Type | null>(
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
