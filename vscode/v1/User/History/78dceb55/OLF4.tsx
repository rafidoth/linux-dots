"use client";
import { AvalabilityType } from "@/app/types";
import AddAvailabilityBooking from "@/app/ui/AddAvailabilityBooking";
import CalendarUI from "@/app/ui/CalendarUI/CalendarUI";
import React, { useState } from "react";

type Props = {};

const Bookings = (props: Props) => {
  const [availabilities, setAvailabilities] = useState<AvalabilityType[]>([]);
  return (
    <div className=" flex flex-col h-screen">
      <div className="h-[100px] border-b flex items-center ">
        <AddAvailabilityBooking
          availabilityState={{
            values: availabilities,
            onChange: (val: AvalabilityType) => {
              setAvailabilities([...availabilities, val]);
            },
          }}
        />
        {availabilities.map((aval) => {
          return <div> {aval} </div>;
        })}
      </div>
      <div className="flex-grow">
        <CalendarUI />
      </div>
    </div>
  );
};

export default Bookings;
