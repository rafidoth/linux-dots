import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  format,
  getHours,
  getMinutes,
  isBefore,
  setHours,
  setMinutes,
  startOfDay,
} from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Clock } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

function DateTimePicker({ date, setDate }) {
  return (
    <div className="w-fit flex flex-col gap-2">
      <DatePicker date={date} setDate={setDate} />
      <TimePicker date={date} setDate={setDate} />
    </div>
  );
}

export default DateTimePicker;

function TimePicker({ date, setDate }) {
  const [ampm, setAmpm] = useState("AM");
  const [hourInput, setHourInput] = useState("");
  const [minuteInput, setMinuteInput] = useState("");

  useEffect(() => {
    let hours = getHours(date);
    setAmpm(hours >= 12 ? "PM" : "AM");
    hours = hours % 12 || 12; // convert 24h → 12h
    setHourInput(hours.toString());
    setMinuteInput(getMinutes(date).toString());
  }, [date]);

  const changeTime = (h, m, ampmValue = ampm) => {
    let hours = parseInt(h);
    let minutes = parseInt(m);

    if (isNaN(hours) || hours < 1 || hours > 12) return;
    if (isNaN(minutes) || minutes < 0 || minutes > 59) return;

    if (ampmValue === "PM" && hours !== 12) hours += 12;
    if (ampmValue === "AM" && hours === 12) hours = 0;

    const newDate = setHours(setMinutes(date, minutes), hours);
    setDate(newDate);
  };

  const handleAmpmToggle = (val) => {
    setAmpm(val);
    changeTime(hourInput, minuteInput, val);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          asChild
          variant={"outline"}
          className={"w-[300px] h-fit rounded-xl"}
        >
          <div className="flex flex-col items-start gap-y-0">
            <div className="flex  items-center gap-x-2">
              <Clock size={64} />
              Select Time
            </div>
            <div className="text-2xl font-[600]">{format(date, "hh:mm a")}</div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={"font-inter "}>
        <div className="flex flex-col items-center font-[500]">
          Select Time
          <DropdownMenuSeparator />
          <div className="flex gap-x-2 items-center">
            <input
              value={hourInput}
              onChange={(e) => {
                if (
                  parseInt(e.target.value) < 1 ||
                  parseInt(e.target.value) > 12
                )
                  return;
                changeTime(e.target.value, minuteInput);
              }}
              className="text-4xl w-[80px] h-[80px] border-none text-center font-[700]"
              maxLength={2}
            />
            <span className="text-4xl font-[700]">:</span>
            <input
              value={minuteInput}
              onChange={(e) => {
                if (
                  parseInt(e.target.value) < 0 ||
                  parseInt(e.target.value) > 59
                )
                  return;
                changeTime(hourInput, e.target.value);
              }}
              className="text-4xl w-[80px] h-[80px] border-none text-center font-[700]"
              maxLength={2}
            />
            <span className="text-4xl font-[700]">{ampm}</span>
            <div className="flex flex-col ml-4">
              <span
                className={`text-xl px-3 py-1 rounded cursor-pointer ${
                  ampm === "AM" ? "bg-black text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => handleAmpmToggle("AM")}
              >
                AM
              </span>
              <span
                className={`text-xl px-3 py-1 rounded cursor-pointer ${
                  ampm === "PM" ? "bg-black text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => handleAmpmToggle("PM")}
              >
                PM
              </span>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DatePicker({ date, setDate }) {
  const handleDateChoosing = (newDate) => {
    const today = new Date();
    if (isBefore(startOfDay(newDate), startOfDay(today))) {
      toast("You cannot select a past date.");
      return;
    }
    setDate(newDate);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          asChild
          variant={"outline"}
          className={"w-[300px] h-fit rounded-xl"}
        >
          <div className="flex flex-col items-start gap-y-0">
            <div className="flex  items-center gap-x-2">
              <CalendarDays size={64} />
              Select a Day
            </div>
            <div className="text-2xl font-[600]">
              {format(date, "do MMMM, yyyy")}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChoosing}
          className="p-10 font-inter font-[500]"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
