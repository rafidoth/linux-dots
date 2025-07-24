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
}

const MentorDataContext = createContext<MentorDataContextType | null>(null);

export const MentorDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mentorData, setMentorData] = useState<MentorData | null>(null);

  const updateMentorInterests = (s_interests: InterestType[]) => {
    const prev = mentorData;
    if (prev) {
      prev.interests = s_interests;
      setMentorData({ ...prev });
      return;
    }
    setMentorData({
      interests: s_interests,
    });
  };

  const updateMentorInfo = (s_info: StudentPersonalInfoType) => {
    const prev = mentorData;
    console.log("updating student info, before update ", prev);
    if (prev) {
      prev.personalInfo = s_info;
      setMentorData({ ...prev });
      console.log("updating student info 0");
      return;
    }
    console.log("updating student info 1");
    setMentorData({
      personalInfo: s_info,
    });
  };
  return (
    <MentorDataContext.Provider
      value={{
        mentorData,
        updateMentorInterests,
        updateMentorInfo,
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
