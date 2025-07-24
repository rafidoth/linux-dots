"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { InterestType, StudentPersonalInfoType } from "../types";

interface StudentData {
  personalInfo: StudentPersonalInfoType;
  interests: InterestType[];
}

interface StudentDataContextType {
  studentData: StudentData | null;
  updateStudentInterests: (s_interests: InterestType[]) => void;
}

const StudentDataContext = createContext<StudentDataContextType | null>(null);

export const StudentDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const updateStudentInterests = (s_interests: InterestType[]) => {
    setStudentData((prev) => ({
      ...prev,
      interests: s_interests,
    }));
  };

  return (
    <StudentDataContext.Provider
      value={{ studentData, updateStudentInterests }}
    >
      {children}
    </StudentDataContext.Provider>
  );
};

export const useStudentData = (): StudentDataContextType => {
  const context = useContext(StudentDataContext);
  if (!context) {
    throw new Error("useStudentData must be used within a StudentDataProvider");
  }
  return context;
};
