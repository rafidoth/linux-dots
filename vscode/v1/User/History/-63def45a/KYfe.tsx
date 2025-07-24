import { getSessionsMentor } from "@/app/lib/fetchers/sessions";
import SessionCard from "@/app/ui/SessionCard";
import { jakarta } from "@/app/utils/font";
import React from "react";

type Props = {};

const MySessions = async (props: Props) => {
  const sessions = await getSessionsMentor();

  return (
    <div className="p-5 flex flex-col">
      <span className={`${jakarta.className} font-black text-4xl m-5`}>
        My Sessions
      </span>
      {sessions.map((session) => {
        return <SessionCard key={session.sessionId} sessionDetails={session} />;
      })}
    </div>
  );
};
export default MySessions;
