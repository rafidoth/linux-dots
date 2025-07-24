"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Props = {
  hour: number;
  minute: number;
  setHour: (h: number) => void;
  setMinute: (m: number) => void;
};

const nostyle =
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
const tStyle = `border-none text-5xl bg-transparent display-inline w-full outline-none caret-transparent text-center ${nostyle}`;

const validateHour = (hour: number) => {
  return hour >= 0 && hour <= 23;
};
const validateMinute = (minute: number) => {
  return minute >= 0 && minute <= 59;
};

function TimeSelection({ hour, minute, setHour, setMinute }: Props) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal ",
              !date && "text-muted-foreground",
              "hover:bg-jigao/30 "
            )}
          >
            <IoCalendarNumber className="text-4xl" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0"></PopoverContent>
      </Popover>
      <div className="flex gap-2 border-none w-full">
        <div className="flex w-1/2">
          <input
            type="number"
            placeholder="00"
            value={hour < 10 ? `0${hour}` : hour}
            onChange={(e) =>
              validateHour(parseInt(e.target.value)) &&
              setHour(parseInt(e.target.value))
            }
            className={cn(tStyle)}
          />
          <div className="flex flex-col h-full">
            <div
              onClick={() => validateHour(hour + 1) && setHour(hour + 1)}
              className="h-1/2 flex items-center hover:text-jigao cursor-pointer text-5xl"
            >
              <FaCaretUp width={50} height={50} />
            </div>
            <div
              onClick={() => validateHour(hour - 1) && setHour(hour - 1)}
              className="h-1/2 flex items-center hover:text-jigao cursor-pointer text-5xl"
            >
              <FaCaretDown />
            </div>
          </div>
        </div>
        <div className="flex w-1/2">
          <input
            type="number"
            placeholder="00"
            value={minute < 10 ? `0${minute}` : minute}
            className={cn(tStyle)}
            onChange={(e) =>
              validateMinute(parseInt(e.target.value)) &&
              setMinute(parseInt(e.target.value))
            }
          />
          <div className="flex flex-col h-full">
            <div
              onClick={() =>
                validateMinute(minute + 1) && setMinute(minute + 1)
              }
              className="h-1/2 flex items-center hover:text-jigao cursor-pointer text-5xl"
            >
              <FaCaretUp width={50} height={50} />
            </div>
            <div
              onClick={() =>
                validateMinute(minute - 1) && setMinute(minute - 1)
              }
              className="h-1/2 flex items-center hover:text-jigao cursor-pointer text-5xl"
            >
              <FaCaretDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeSelection;
