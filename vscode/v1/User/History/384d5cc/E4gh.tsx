import React from "react";

const page = () => {
  return(
    <div className=" flex flex-col h-screen">
      <div className="h-[100px] border-b flex items-center justify-between px-2">
        <div className="flex gap-2 items-center">
          <div>
            <CalendarMonthSwitcher />
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[20px] h-[20px] bg-orange-800 rounded-2xl"></div>
            Booked Slot
          </div>
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
  ) 
};

export default page;
