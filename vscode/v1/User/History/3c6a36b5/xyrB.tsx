"use client";
import React from "react";
import { useCalendarContext } from "./CalendarContext";

import { getMonth, addMonths, subMonths } from "date-fns";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const CalendarMonthSwitcher = () => {
  const { date, setDate } = useCalendarContext();
  const month = months[getMonth(date)];
  const year = date.getFullYear();

  const goToPreviousMonth = () => {
    setDate(subMonths(date, 1));
  };

  const goToNextMonth = () => {
    setDate(addMonths(date, 1));
  };

  return (
    <div>
      <div className={cn("w-[100px] h-[60px] flex flex-col")}>
        <div>{year}</div>
        <div className="flex justify-evenly bg-orange-800 rounded-lg">
          <span className="hover:opacity-60" onClick={goToPreviousMonth}>
            <ChevronLeft />
          </span>
          <span className="w-full  flex justify-center font-semibold ">
            {month}
          </span>
          <span className="hover:opacity-60" onClick={goToNextMonth}>
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
