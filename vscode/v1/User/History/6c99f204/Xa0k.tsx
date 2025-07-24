"use client";
import React, { createContext, useState, useContext } from "react";

interface Props {
  children: React.ReactNode;
}

export type UserContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  reply: string;
  setReply: (reply: string) => void;
};

const StreamContext = createContext<StreamContextType>({
  loading: false,
  setLoading: () => {},
  reply: "",
  setReply: () => {},
});

export const StreamContextProvider = ({ children }: Props) => {
  const [reply, setReply] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <StreamContext.Provider value={{ reply, setReply, loading, setLoading }}>
      {children}
    </StreamContext.Provider>
  );
};

export const useStream = () => useContext(StreamContext);
