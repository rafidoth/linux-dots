"use client";
import React, { ReactNode, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { ViewVerticalIcon } from "@radix-ui/react-icons";
import ThemeChanger from "../components/ThemeChanger";
import { QuizSetContextProvider } from "../contexts/Quizset.context";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<Boolean>(true);
  return (
    <QuizSetContextProvider>
      <main className={`flex  px-4 h-screen overflow-hidden`}>
        {sidebarOpen && (
          <Sidebar
            sidebar={sidebarOpen}
            toggleSidebarAction={() => setSidebarOpen(!sidebarOpen)}
          />
        )}
        <div className={`flex-1 flex flex-col h-screen`}>
          <div
            className={`w-full h-[60px] flex justify-between items-center  mb-2 px-4`}
          >
            <div>
              {!sidebarOpen && (
                <ViewVerticalIcon
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`cursor-pointer
              hover:text-white/50
              w-6 h-6`}
                />
              )}
            </div>
            <ThemeChanger />
          </div>
          <div className={`flex-1`}>{children}</div>
        </div>
      </main>
    </QuizSetContextProvider>
  );
}
