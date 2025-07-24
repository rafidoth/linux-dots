"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { InterestType, StudentPersonalInfoType } from "../types";

interface MentorData {
  mentor_id?: string;
  personalInfo?: StudentPersonalInfoType;
  interests?: InterestType[];
}

interface MentorDataContextType {
  mentorData: MentorData | null;
  updateMentorInterests: (s_interests: InterestType[]) => void;
  updateMentorInfo: (s_info: StudentPersonalInfoType) => void;
  // updateStudentID: (s_id: string) => void;
}

const MentorDataContext = createContext<MentorDataContextType | null>(null);

export const MentorDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mentorData, setMentorData] = useState<MentorData | null>(null);
  return (
    <MentorDataContext.Provider
      value={{
        mentorData,
        updateStudentInterests,
        updateStudentInfo,
      }}
    >
      {children}
    </MentorDataContext.Provider>
  );
};

export const useStudentData = (): StudentDataContextType => {
  const context = useContext(StudentDataContext);
  if (!context) {
    throw new Error("useStudentData must be used within a StudentDataProvider");
  }
  return context;
};
