"use client";
import React, { createContext, useState, useContext } from "react";
import { QuizsetType } from "../utils/types";

interface Props {
  children: React.ReactNode;
}

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
