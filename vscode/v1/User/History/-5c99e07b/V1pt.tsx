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
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <Image
              src={sessionDetails.mentorImageLink}
              alt={sessionDetails.mentorName}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{sessionDetails.title}</h2>
              <p className="text-gray-600">with {sessionDetails.mentorName}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">
              Duration: {sessionDetails.DurationInMinutes} minutes
            </p>
            <p className="text-gray-700">Price: ${sessionDetails.Price}</p>
            <p className="text-gray-700">Session Type: {sessionDetails.type}</p>
            <p className="text-gray-700">
              Meeting via: {sessionDetails.session_medium.join(", ")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{sessionDetails.Description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionDetailsSheet;
