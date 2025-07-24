"use client";
import React, { createContext, useState, useContext } from "react";
import { User_Type } from "../utils/types";

interface Props {
  children: React.ReactNode;
}

export const initialUserValue: User_Type = {
    user_id: null,
};



const CurrentUserContext = createContext({
  currentUser: initialUserValue,
  setCurrentUser: (user) => void,
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
