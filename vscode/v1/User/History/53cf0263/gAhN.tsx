"use client";
import React, { createContext, useState, useContext } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export type CurrentUserContextType = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
};

export const initialUserValue: User = {
  id: "",
  name: "",
  email: "",
};

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: initialUserValue,
  setCurrentUser: () => {},
});

export const CurrentUserContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>(initialUserValue);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserCtx = () => useContext(CurrentUserContext);
