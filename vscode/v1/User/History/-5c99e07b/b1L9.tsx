"use client";
import { getSessionBySessionID } from "@/app/lib/fetchers/sessions";
import { SessionInfoType } from "@/app/types";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {
  sessionId: string;
};

const SessionDetailsSheet = ({ sessionId }: Props) => {
  const [sessionDetails, setSessionDetails] =
    React.useState<SessionInfoType | null>(null);
  useEffect(() => {
    const fn = async () => {
      const data: SessionInfoType = await getSessionBySessionID(sessionId);
      setSessionDetails(data);
    };
    fn();
  }, [sessionId]);
  return (
    <div>
      {sessionDetails && (
        <div>
          <span className="font-semibold text-3xl">{sessionDetails.title}</span>
          <span className="flex">
            <Image
              src={sessionDetails.mentor.profilePic}
              alt="Mentor"
              width={50}
              height={50}
              className="rounded-full mr-2"
            />
            <span className="text-xl">{sessionDetails.mentorName}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default SessionDetailsSheet;
