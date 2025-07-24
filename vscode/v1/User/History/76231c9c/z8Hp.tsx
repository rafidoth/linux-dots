"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setDate } from "date-fns";

const monthMap = [
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
] as const;
type Props = {
  dobValue: Date;
  onDoBChange: (dob: Date) => void;
};
function DobPicker({ dobValue, onDoBChange }: Props) {
  const startYear: number = 1990;
  const [year, setYear] = React.useState<number>(2000);
  const [month, setMonth] = React.useState<number>(1);
  //   const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
  // new Date(2025, 1, 5)
  //   );

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      onDoBChange(undefined);
    } else {
      setMonth(date.getMonth());
      setYear(date.getFullYear());
      onDoBChange(date);
    }
  };
  const handleMonthChange = (month: Date) => {
    setMonth(month.getMonth());
  };
  const handleSelection(date: Date) {
    onDoBChange(date);
  }
  React.useEffect(() => {
    onDoBChange(new Date(year, month, 1));
  }, [year, month]);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-y-4 p-3">
        <Select onValueChange={(value) => setYear(parseInt(value))}>
          <SelectTrigger className="w-[180px] cursor-pointer ">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 25 }, (_, i) => (
              <SelectItem key={i} value={(startYear + i).toString()}>
                {startYear + i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setMonth(parseInt(value))}>
          <SelectTrigger className="w-[180px] cursor-pointer ">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem key={i} value={i.toString()}>
                {monthMap[i]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Calendar
        mode="single"
        month={new Date(year, month, 1)}
        onMonthChange={handleMonthChange}
        selected={dobValue}
        onSelect={handleDayPickerSelect}
        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        initialFocus
        className="w-full"
      />
    </div>
  );
}

export default DobPicker;
