import { ReactNode } from "react";
import { StudentDataProvider } from "../contexts/StudentDataContext";
export function Providers({ children }: { children: ReactNode }) {
  return <StudentDataProvider>{children}</StudentDataProvider>;
}
