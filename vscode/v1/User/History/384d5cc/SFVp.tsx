import CalendarMonthSwitcher from "@/app/ui/CalendarUI/CalendarMonthSwitcher";
import CalendarUI from "@/app/ui/CalendarUI/CalendarUI";
import React from "react";

const page = () => {
  return (
    <div className=" flex flex-col h-screen">
      <div className="h-[100px] border-b flex items-center justify-between px-2">
        <div className="flex gap-2 items-center">
          <div>
            <CalendarMonthSwitcher />
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <CalendarUI />
      </div>
    </div>
  );
};

export default page;
