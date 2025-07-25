import { getSessionsStudent } from "@/app/lib/fetchers/sessions";
import { SessionInfoType } from "@/app/types";
import { gradientText1 } from "@/app/ui/CustomStyles";
import SessionCard from "@/app/ui/SessionCard";
import { jakarta } from "@/app/utils/font";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React from "react";

const SessionsPage = async () => {
  const sessions: SessionInfoType[] = await getSessionsStudent();
  return (
    <div className="px-16">
      <div className="flex justify-end items-center">
        <div
          className={cn(
            "font-black text-8xl  px-2 pb-2 my-6 z-10 ",
            jakarta.className,
            gradientText1
          )}
        >
          1:1 Sessions
        </div>
      </div>
      <ScrollArea className="h-[800px] ">
        <div className="flex flex-wrap gap-x-10  my-8 justify-center  ">
          {sessions.map((s, i: number) => (
            <SessionCard key={i} sessionDetails={s} student={true} />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default SessionsPage;
