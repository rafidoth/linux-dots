"use client";
import React, { useEffect } from "react";

type Props = {
  sessionId: string;
};

const SessionDetailsSheet = ({ sessionId }: Props) => {
  useEffect(() => {
    const fn = async () => {
      const data = await fetch(`/api/session/${sessionId}`);
      const res = await data.json();
      console.log(res);
    };
    fn();
  }, [sessionId]);
  return <div>SessionDetailsSheet</div>;
};

export default SessionDetailsSheet;
