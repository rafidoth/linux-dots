"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { IoTime } from "react-icons/io5";

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

function getAmOrPm(hour: number, minute: number): string {
  if (hour < 0 || hour > 23) {
    throw new Error("Hour must be between 0 and 23.");
  }
  if (minute < 0 || minute > 59) {
    throw new Error("Minute must be between 0 and 59.");
  }

  // Determine AM or PM
  return hour < 12 ? "AM" : "PM";
}
function TimeSelection({ hour, minute, setHour, setMinute }: Props) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal ",
              "hover:bg-jigao/30 outline-none"
            )}
          >
            <IoTime className="text-3xl" />
            {hour > 12 ? hour - 12 : hour} : {minute} {getAmOrPm(hour, minute)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
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
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default TimeSelection;
