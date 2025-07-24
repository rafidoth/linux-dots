import { useCurrentQuizsetCtx } from "@/app/contexts/CurrentQuizset.context";
import { ViewVerticalIcon } from "@radix-ui/react-icons";
import React from "react";
import ThemeChanger from "../ThemeChanger";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (s: boolean) => void;
};

const Topbar = (props: Props) => {
  const { currentQuizset } = useCurrentQuizsetCtx();
  return (
    <div
      className={`w-full h-[60px] flex justify-between items-center  mb-2 px-4`}
    >
      <div>
        {!props.sidebarOpen && (
          <ViewVerticalIcon
            onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
            className={`cursor-pointer
              hover:text-white/50
              w-6 h-6`}
          />
        )}
      </div>
      <div>{currentQuizset && <div>{currentQuizset.quizset.title}</div>}</div>
      <ThemeChanger />
    </div>
  );
};

export default Topbar;
