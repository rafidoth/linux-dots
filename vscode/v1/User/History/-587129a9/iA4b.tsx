import React from "react";
import { NextBookedType } from "../types";

type Props = {
  BookedSession: NextBookedType;
  status: "upcoming" | "goingon";
};

const SidebarTimeLeft = ({ BookedSession }: Props) => {
  return <div>{BookedSession.SessionTitle}</div>;
};

export default SidebarTimeLeft;
