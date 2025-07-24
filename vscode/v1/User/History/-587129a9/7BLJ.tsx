import React, { useState } from "react";
import { NextBookedType } from "../types";
import { differenceInMinutes, format } from "date-fns";
import { boolean } from "zod";

type Props = {
  BookedSession: NextBookedType;
  status: "upcoming" | "goingon";
};

const calculateTimeLeft = (t: Date, d: number) => {
  const endtime = new Date(t.getTime() + d * 60 * 1000);
  const now = new Date();
  console.log("nowtime", now);
  console.log("endtime", endtime);
  const diff = differenceInMinutes(endtime, now);
  return diff;
};
const SidebarTimeLeft = ({ BookedSession, status }: Props) => {
  const [timeLeft, setTimeLeft] = useState(
    status === "upcoming"
      ? calculateTimeLeft(
          BookedSession.StartTime,
          BookedSession.DurationInMinutes
        )
      : differenceInMinutes(BookedSession.StartTime, new Date())
  );
  return (
    <div>
      {status}
      {BookedSession.SessionTitle} {format(BookedSession.StartTime, "Pp")}
    </div>
  );
};

export default SidebarTimeLeft;
