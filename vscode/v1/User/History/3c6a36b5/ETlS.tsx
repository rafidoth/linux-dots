"use client";
import React from "react";
import { useCalendarContext } from "./CalendarContext";

type Props = {};

import { getMonth } from "date-fns";
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
  return <div> {month}</div>;
};

export default CalendarMonthSwitcher;
