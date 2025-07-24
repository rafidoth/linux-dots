"use client";
import React, { createContext, useState, useContext } from "react";

interface Props {
  children: React.ReactNode;
}

export type UserContextType = {};

const UserContext = createContext<UserContextType>({
  loading: false,
  setLoading: () => {},
  reply: "",
  setReply: () => {},
});

export const UserContextProvider = ({ children }: Props) => {
  const [reply, setReply] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <UserContext.Provider value={{ reply, setReply, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserCtx = () => useContext(UserContext);
