"use client";
import React from "react";
import { useCalendarContext } from "./CalendarContext";

type Props = {};

import { getMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
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
        <div className="flex bg-orange-800">
          <span>
            <ChevronLeft />
          </span>
          <span className="w-full  flex justify-center font-semibold rounded-lg">
            {month}
          </span>
          <span>
            <ChevronRight />
          </span>
        </div>
        <span className="w-full flex justify-center text-4xl font-semibold">
          {date.getDate()}
        </span>
      </div>
    </div>
  );
};

export default CalendarMonthSwitcher;
