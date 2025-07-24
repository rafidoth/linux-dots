"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { DateTimePicker } from "@/app/ui/CalendarUI/CustomDateTimePicker";
import { hover_style, smooth_hover, theme_border } from "@/app/ui/CustomStyles";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { addAvailability } from "../lib/mutations/availability";
import { AvalabilityType } from "../types";
import { isBefore, isSameDay } from "date-fns";
type Props = {
  availabilityState: {
    values: AvalabilityType[];
    onChange: (val: AvalabilityType) => void;
  };
};

const AddAvailabilityBooking = (props: Props) => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [medium, setMedium] = useState<"online" | "offline">("online");
  const handleAvailabilitySave = async () => {
    // start and end time should be in a single day
    // start time is always less than end time
    if (isSameDay(startTime, endTime) && isBefore(startTime, endTime)) {
    }

    // new availability post request to server
    await addAvailability(startTime, endTime, medium);
    props.availabilityState.onChange({
      start: startTime,
      end: endTime,
      booked: false,
    });
  };
  console.log("start ", startTime);
  console.log("end ", endTime);
  return (
    <Dialog>
      <DialogTrigger>
        <span
          className={cn(
            theme_border,
            hover_style,
            smooth_hover,
            "px-4 cursor-pointer text-lg"
          )}
        >
          Add Availability
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl">Create Avaliablity</DialogTitle>
        <div className="text-lg flex flex-col gap-4">
          <span className="mx-3 font-semibold">Start</span>
          <DateTimePicker
            field={{
              value: startTime,
              onChange: (val: Date) => {
                setStartTime(val);
              },
            }}
          />
          <span className="mx-3 font-semibold">End</span>
          <DateTimePicker
            field={{
              value: endTime,
              onChange: (val: Date) => {
                setEndTime(val);
              },
            }}
          />
          <span>Available </span>
          <div className="flex gap-4 mx-3 select-none">
            <span className="border-orange-500">Online</span>
            <span>Offline</span>
          </div>
        </div>
        <DialogClose>
          <span
            className={cn(
              theme_border,
              hover_style,
              smooth_hover,
              "px-4 text-lg"
            )}
            onClick={handleAvailabilitySave}
          >
            Save
          </span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AddAvailabilityBooking;
