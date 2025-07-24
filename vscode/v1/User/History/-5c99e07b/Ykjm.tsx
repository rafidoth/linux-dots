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
  return <div>{sessionDetails && <div></div>}</div>;
};

export default SessionDetailsSheet;
