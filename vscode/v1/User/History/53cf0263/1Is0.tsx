"use client";
import React, { createContext, useState, useContext } from "react";
import { User_Type } from "../utils/types";

interface Props {
  children: React.ReactNode;
}

export const initialUserValue: User_Type = {
  user_id: null,
};

export type CurrentUserContextType = {
  currentUser: User_Type;
  setCurrentUser: (user: User_Type) => void;
};

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: initialUserValue,
  setCurrentUser: () => {},
});

export const CurrentUserContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User_Type>(initialUserValue);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserCtx = () => useContext(CurrentUserContext);
