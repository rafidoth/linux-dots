"use client";
import React from "react";
import { useCalendarContext } from "./CalendarContext";

type Props = {};

import { getMonth } from "date-fns";
import { cn } from "@/lib/utils";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarMonthSwitcher = (props: Props) => {
  const { date, setDate } = useCalendarContext();
  const month = months[getMonth(date)];
  return (
    <div>
      <div className={cn("w-[80px] h-[60px] flex flex-col")}>
        <span className="w-full bg-orange-800 flex justify-center font-semibold rounded-lg">
          {month}
        </span>
        <span className="w-full flex justify-center text-4xl font-semibold">
          {date.getDate()}
        </span>
      </div>
    </div>
  );
};

export default CalendarMonthSwitcher;
