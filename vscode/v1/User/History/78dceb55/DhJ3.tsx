import CalendarUI from "@/app/ui/CalendarUI/CalendarUI";
import { hover_style, smooth_hover, theme_border } from "@/app/ui/CustomStyles";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type Props = {};

const Bookings = (props: Props) => {
  return (
    <div className=" flex flex-col h-screen">
      <div className="h-[100px] border-b flex items-center ">
        <Popover>
          <PopoverTrigger>
            <button
              className={cn(
                theme_border,
                hover_style,
                smooth_hover,
                "px-4 cursor-pointer"
              )}
            >
              Add Availability
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="">
              <Calendar />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex-grow">
        <CalendarUI />
      </div>
    </div>
  );
};

export default Bookings;
