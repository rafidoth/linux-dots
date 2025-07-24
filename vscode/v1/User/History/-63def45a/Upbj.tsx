import { getSessionsMentor } from "@/app/lib/fetchers/sessions";
import SessionCard from "@/app/ui/SessionCard";
import { jakarta } from "@/app/utils/font";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const MySessions = async () => {
  const sessions = await getSessionsMentor();

  return (
    <div className="p-5 flex flex-col">
      <div className="flex justify-between items-center m-5">
        <span className={`${jakarta.className} font-black text-4xl`}>
          My Sessions
        </span>
        <Link href="/m/mysessions/new">
          <Button className="cursor-pointer">Create New Session</Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-5">
        {sessions.length === 0 ? (
          <p className="text-muted-foreground">No sessions created yet</p>
        ) : (
          sessions.map((session) => (
            <SessionCard
              student={false}
              key={session.sessionId}
              sessionDetails={session}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MySessions;
