"use client";
import React, { createContext, useState, useContext } from "react";

interface Props {
  children: React.ReactNode;
}

export type QuizsetContextType = {
    QuizsetID :string
};

const QuizSetContext = createContext<QuizsetContextType>({
    QuizsetID: 
});

export const QuizSetContextProvider = ({ children }: Props) => {
  const [QuizsetID, setQuizsetID] = useState<string[]>([]);

  return (
    <QuizSetContext.Provider value={{ QuizsetID, setQuizsetID }}>
      {children}
    </QuizSetContext.Provider>
  );
};

export const useQuizSetCtx = () => useContext(QuizSetContext);
