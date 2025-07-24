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
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">{sessionDetails.title}</h2>
            <p>{sessionDetails.Description}</p>
            <p>Date: {new Date(sessionDetails.start).toLocaleDateString()}</p>
            <p>Time: {new Date(sessionDetails.start).toLocaleTimeString()}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <Image
              src={sessionDetails.mentor.avatar}
              alt={sessionDetails.mentor.name}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold">{sessionDetails.mentor.name}</h3>
              <p>{sessionDetails.mentor.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionDetailsSheet;
