import { ReactNode } from "react";
import { StudentDataProvider } from "../contexts/StudentDataContext";
import { MentorDataProvider } from "../contexts/MentorDataContext";
import { CalendarProvider } from "../ui/CalendarUI/CalendarContext";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MentorDataProvider>
      <StudentDataProvider>
        <CalendarProvider>{children}</CalendarProvider>
      </StudentDataProvider>
    </MentorDataProvider>
  );
}
