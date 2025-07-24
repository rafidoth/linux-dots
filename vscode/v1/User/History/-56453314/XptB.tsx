"use client";
import React, { createContext, useState, useContext } from "react";
import { QuizsetType } from "../utils/types";

interface Props {
  children: React.ReactNode;
}

export type QuizsetContextType = {
  QuizsetID: QuizsetType[];
  setQuizsetID: (QuizsetID: QuizsetType[]) => void;
};

const QuizSetContext = createContext<QuizsetContextType>({
  QuizsetID: [],
  setQuizsetID: () => {},
});

export const QuizSetContextProvider = ({ children }: Props) => {
  const [QuizsetID, setQuizsetID] = useState<QuizsetType[]>([]);

  return (
    <QuizSetContext.Provider value={{ QuizsetID, setQuizsetID }}>
      {children}
    </QuizSetContext.Provider>
  );
};

export const useQuizSetCtx = () => useContext(QuizSetContext);
