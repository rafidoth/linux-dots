import React from "react";
import { NextBookedType } from "../types";
import { format } from "date-fns";

type Props = {
  BookedSession: NextBookedType;
  status: "upcoming" | "goingon";
};

const SidebarTimeLeft = ({ BookedSession, status }: Props) => {
  return (
    <div>
      {status}
      {BookedSession.SessionTitle} {format(BookedSession.StartTime, "Pp")}
    </div>
  );
};

export default SidebarTimeLeft;
