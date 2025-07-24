import SessionCard from "@/app/ui/SessionCard";
import { jakarta } from "@/app/utils/font";
import React from "react";

type Props = {};

const MySessions = (props: Props) => {
  return (
    <div className="p-5">
      <span className={`${jakarta.className} font-black text-4xl my-2`}>
        My Sessions
      </span>
      <SessionCard />
    </div>
  );
};
export default MySessions;
