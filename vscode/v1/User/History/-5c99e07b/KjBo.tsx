"use client";
import { getSessionBySessionID } from "@/app/lib/fetchers/sessions";
import { BookedSessionType, SessionInfoType } from "@/app/types";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {
  bookedSession: BookedSessionType;
};

const SessionDetailsSheet = ({ bookedSession }: Props) => {
  const [sessionDetails, setSessionDetails] =
    React.useState<SessionInfoType | null>(null);
  useEffect(() => {
    const fn = async () => {
      const data: SessionInfoType = await getSessionBySessionID(
        bookedSession.sessionId
      );
      setSessionDetails(data);
    };
    fn();
  }, [bookedSession.sessionId]);
  return (
    <div>
      {sessionDetails && (
        <div className="flex flex-col p-4">
          <span className="font-semibold text-3xl">{sessionDetails.title}</span>
          <span className="bg-orange-800 px-2 py-1 rounded-md my-2 ">
            {sessionDetails.type}
          </span>
          <span className="flex my-2  items-center gap-x-2">
            <Image
              src={sessionDetails.mentorImageLink}
              alt="Mentor"
              width={40}
              height={40}
              className="rounded-full mr-2 border-2 border-white"
            />
            <span className="text-xl">{sessionDetails.mentorName}</span>
          </span>
          <span></span>
          <span>{sessionDetails.Description}</span>
        </div>
      )}
    </div>
  );
};

export default SessionDetailsSheet;
