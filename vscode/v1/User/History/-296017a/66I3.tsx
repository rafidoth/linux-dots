import { getSessionsStudent } from "@/app/lib/fetchers/sessions";
import { SessionInfoType } from "@/app/types";
import SessionCard from "@/app/ui/SessionCard";
import { jakarta } from "@/app/utils/font";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const SessionsPage = async (props: Props) => {
  const sessions: SessionInfoType[] = await getSessionsStudent();
  return (
    <div className=" px-16">
      <div className="flex justify-end items-center">
        <div
          className={cn(
            "font-semibold text-5xl  px-2 pb-2 my-6 z-10 ",
            jakarta.className,
            "border-b-2 border-orange-800"
          )}
        >
          1:1 Sessions
        </div>
      </div>
      <ScrollArea className="h-[800px]">
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
