import React from "react";
import { NextBookedType } from "../types";

type Props = {
  BookedSession: NextBookedType;
  status: "upcoming" | "goingon";
};

const SidebarTimeLeft = ({ BookedSession, status }: Props) => {
  return (
    <div>
      {status}
      {BookedSession.SessionTitle} {BookedSession.StartTime.toISOString()}
    </div>
  );
};

export default SidebarTimeLeft;
