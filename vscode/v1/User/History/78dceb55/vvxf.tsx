import AddAvailabilityBooking from "@/app/ui/AddAvailabilityBooking";
import CalendarUI from "@/app/ui/CalendarUI/CalendarUI";
import React, { useState } from "react";

type Props = {};

const Bookings = (props: Props) => {
  const [availabilities, setAvailabilities] = useState([]);
  return (
    <div className=" flex flex-col h-screen">
      <div className="h-[100px] border-b flex items-center ">
        <AddAvailabilityBooking />
      </div>
      <div className="flex-grow">
        <CalendarUI />
      </div>
    </div>
  );
};

export default Bookings;
