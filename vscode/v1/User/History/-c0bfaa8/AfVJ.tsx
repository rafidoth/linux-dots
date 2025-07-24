import { ReactNode } from "react";
import { StudentDataProvider } from "../contexts/StudentDataContext";
import { MentorDataProvider } from "../contexts/MentorDataContext";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MentorDataProvider>
      <StudentDataProvider>{children}</StudentDataProvider>;
    </MentorDataProvider>
  );
}
