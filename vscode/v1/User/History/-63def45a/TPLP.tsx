import SessionCard from "@/app/ui/SessionCard";
import React from "react";

type Props = {};

const MySessions = (props: Props) => {
  return (
    <div className="p-5">
      <span>My Sessions</span>
      <SessionCard />
    </div>
  );
};
export default MySessions;
