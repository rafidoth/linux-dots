"use client";
import { getAvailabilities } from "@/app/lib/fetchers/availability";
import { AvalabilityType } from "@/app/types";
import AddAvailabilityBooking from "@/app/ui/AddAvailabilityBooking";
import CalendarUI from "@/app/ui/CalendarUI/CalendarUI";
import React, { useEffect, useState } from "react";

type Props = {};

const Bookings = (props: Props) => {
  const [availabilities, setAvailabilities] = useState<AvalabilityType[]>([]);
  console.log(availabilities);
  useEffect(() => {
    const fn = async () => {
      const res = await getAvailabilities();
      setAvailabilities(res);
    };
    fn();
  }, []);
  return (
    <div className=" flex flex-col h-screen">
      <div className="h-[100px] border-b flex items-center ">
        <div>
          <span className="w-[20px] h-[20px] bg-orange-800"></span>
        </div>
        <div>
          <AddAvailabilityBooking
            availabilityState={{
              values: availabilities,
              onChange: (val: AvalabilityType) => {
                setAvailabilities([...availabilities, val]);
              },
            }}
          />
        </div>
      </div>
      <div className="flex-grow">
        <CalendarUI availabilities={availabilities} />
      </div>
    </div>
  );
};

export default Bookings;
