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

  return (
    <QuizSetContext.Provider value={{ reply, setReply, loading, setLoading }}>
      {children}
    </QuizSetContext.Provider>
  );
};

export const useQuizSetCtx = () => useContext(QuizSetContext);
