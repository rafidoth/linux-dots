import React, { createContext, useContext, useState, ReactNode } from "react";
import { InterestType } from "../types";

interface StudentData {
  interests: InterestType[];
}

interface StudentDataContextType {
  student: StudentData[];
  addStudent: (student: StudentData) => void;
}

const StudentDataContext = createContext<StudentDataContextType | null>(null);

export const StudentDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const updateStudentData = (student: StudentData) => {
    setStudent((prev) => [...prev, student]);
  };

  return (
    <StudentDataContext.Provider value={{ students, addStudent }}>
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
