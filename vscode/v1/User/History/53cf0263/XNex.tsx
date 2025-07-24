"use client";
import React, { createContext, useState, useContext } from "react";

interface Props {
  children: React.ReactNode;
}

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
