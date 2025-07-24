"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {};

const nostyle =
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
const tStyle = `border-none text-9xl bg-transparent display-inline w-full outline-none caret-transparent text-center ${nostyle}`;

const validateHour = (hour: number) => {
  return hour >= 0 && hour <= 23;
};
const validateMinute = (minute: number) => {
  return minute >= 0 && minute <= 59;
};

function TimeSelection({}: Props) {
  const [hour, setHour] = React.useState<number>(7);
  const [minute, setMinute] = React.useState<number>(30);
  return (
    <div>
      <div className="flex gap-2 border-none w-[400px]">
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
            <div className="h-1/2">Up</div>
            <div>down</div>
          </div>
        </div>
        <div className="w-1/2">
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
        </div>
      </div>
    </div>
  );
}

export default TimeSelection;
