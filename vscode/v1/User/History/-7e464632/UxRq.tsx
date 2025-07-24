"use client";
import React, { ReactNode, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { QuizSetContextProvider } from "../contexts/Quizset.context";
import { CurrentQuizsetContextProvider } from "../contexts/CurrentQuizset.context";
import Topbar from "../components/Dashboard/Topbar";
import { CurrentUserContextProvider } from "../contexts/CurrentUserContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  return (
    <QuizSetContextProvider>
      <CurrentQuizsetContextProvider>
        <CurrentUserContextProvider>
          <main className="flex flex-col h-screen overflow-hidden">
            <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className={`flex  px-4 h-screen overflow-hidden`}>
              {sidebarOpen && (
                <Sidebar
                  sidebar={sidebarOpen}
                  toggleSidebarAction={() => setSidebarOpen(!sidebarOpen)}
                />
              )}
              <div className={`flex-1 flex flex-col h-screen`}>
                <div className={`flex-1`}>{children}</div>
              </div>
            </div>
          </main>
        </CurrentUserContextProvider>
      </CurrentQuizsetContextProvider>
    </QuizSetContextProvider>
  );
}
