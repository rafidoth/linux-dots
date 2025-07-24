import { getSessionsStudent } from "@/app/lib/fetchers/sessions";
import { SessionInfoType } from "@/app/types";
import SessionCard from "@/app/ui/SessionCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";

type Props = {};

const SessionsPage = async (props: Props) => {
  const sessions: SessionInfoType[] = await getSessionsStudent();
  return (
    <div className="py-16 px-4">
      <div className="h-[80px] bg-black/30 backdrop-blur-none">
        <div className="font-semibold text-5xl bg-orange-800 px-2 rounded-lg z-10 w-[300px]">
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
