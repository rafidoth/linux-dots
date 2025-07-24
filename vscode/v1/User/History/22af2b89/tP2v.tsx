"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { InterestType, StudentPersonalInfoType } from "../types";

interface StudentData {
  student_id: string;
  personalInfo: StudentPersonalInfoType;
  interests: InterestType[];
}

interface StudentDataContextType {
  studentData: StudentData | null;
  updateStudentInterests: (s_interests: InterestType[]) => void;
  updateStudentInfo: (s_info: StudentPersonalInfoType) => void;
}

const StudentDataContext = createContext<StudentDataContextType | null>(null);

export const StudentDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const updateStudentInterests = (s_interests: InterestType[]) => {
    setStudentData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        interests: s_interests,
      };
    });
  };

  const updateStudentInfo = (s_info: StudentPersonalInfoType) => {
    setStudentData((prev) => ({
      ...prev,
      personalInfo: s_info,
    }));
  };

  return (
    <StudentDataContext.Provider
      value={{ studentData, updateStudentInterests, updateStudentInfo }}
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
