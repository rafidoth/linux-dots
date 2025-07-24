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
import { Input } from "@/components/ui/input";
import { useState } from "react";

function DateTimePicker({ date, setDate }) {
  const handleDateChoosing = (newDate) => {
    const today = new Date();
    if (isBefore(startOfDay(newDate), startOfDay(today))) {
      toast("You cannot select a past date.");
      return;
    }
    setDate(newDate);
  };
  return (
    <div className="w-fit flex flex-col gap-2">
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
      <TimePicker date={date} setDate={setDate} />
    </div>
  );
}

export default DateTimePicker;

export function TimePicker({ date, setDate }) {
  const [ampm, setAmpm] = useState("AM");
  const changeTime = (hours, minutes) => {
    if (hours < 0 || hours > 23) return;
    if (minutes < 0 || minutes > 59) return;
    const newDate = new Date(date);

    setDate(setHours(setMinutes(date, minutes), hours));
    setDate();

    if (ampm === "AM") {
    } else {
    }
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
              value={getHours(local)}
              onChange={(e) => handleSetHours(e.target.value)}
              className="text-4xl w-[80px] h-[80px] border-none text-center font-[700]"
            />
            <span className="text-4xl border-none text-center font-[700]">
              :
            </span>
            <input
              value={getMinutes(local)}
              onChange={(e) => handleSetMinutes(e.target.value)}
              className="text-4xl w-[80px] h-[80px] border-none text-center font-[700]"
            />
            <span className="text-4xl border-none text-center font-[700] cursor-pointer hover:bg-accent p-2 rounded-xl">
              AM
            </span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
