"use client";
import React, { ReactNode, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { QuizSetContextProvider } from "../contexts/Quizset.context";
import { CurrentQuizsetContextProvider } from "../contexts/CurrentQuizset.context";
import { CurrentUserContextProvider } from "../contexts/CurrentUserContext";
import { ViewVerticalIcon } from "@radix-ui/react-icons";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  return (
    <QuizSetContextProvider>
      <CurrentQuizsetContextProvider>
        <CurrentUserContextProvider>
          <main className="flex flex-col h-screen overflow-hidden">
            <div className={`flex  px-4 h-screen overflow-hidden`}>
              {sidebarOpen && (
                <Sidebar
                  sidebar={sidebarOpen}
                  toggleSidebarAction={() => setSidebarOpen(!sidebarOpen)}
                />
              )}

              {!sidebarOpen && (
                <div className="w-[50] border-r border-dashed">
                  <ViewVerticalIcon
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`cursor-pointer
              hover:text-white/50
              w-6 h-6 my-10`}
                  />
                </div>
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
