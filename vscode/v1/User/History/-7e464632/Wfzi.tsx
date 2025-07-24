"use client";
import React, { ReactNode, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { ViewVerticalIcon } from "@radix-ui/react-icons";
import ThemeChanger from "../components/ThemeChanger";
import { QuizSetContextProvider } from "../contexts/Quizset.context";
import {
  CurrentQuizsetContextProvider,
  useCurrentQuizsetCtx,
} from "../contexts/CurrentQuizset.context";
import Topbar from "../components/Dashboard/Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const { currentQuizset, setCurrentQuizset } = useCurrentQuizsetCtx();
  return (
    <QuizSetContextProvider>
      <CurrentQuizsetContextProvider>
        <main className={`flex  px-4 h-screen overflow-hidden`}>
          {sidebarOpen && (
            <Sidebar
              sidebar={sidebarOpen}
              toggleSidebarAction={() => setSidebarOpen(!sidebarOpen)}
            />
          )}
          <div className={`flex-1 flex flex-col h-screen`}>
            <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className={`flex-1`}>{children}</div>
          </div>
        </main>
      </CurrentQuizsetContextProvider>
    </QuizSetContextProvider>
  );
}
