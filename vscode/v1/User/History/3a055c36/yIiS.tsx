"use client";
// import { useCalendarContext } from '../../calendar-context'
// import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  format,
  isWithinInterval,
  isBefore,
  startOfToday,
} from "date-fns";

import { cn } from "@/lib/utils";
import { AvalabilityType, BookedSessionType } from "@/app/types";
import { useCalendarContext } from "./CalendarContext";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SessionDetailsSheet from "./SessionDetailsSheet";
type Props = {
  availabilities?: AvalabilityType[];
  bookedSessions?: BookedSessionType[];
};

export default function CalendarUI(props: Props) {
  //   const { date, events, setDate, setMode } = useCalendarContext();
  const { date } = useCalendarContext();

  // Get the first day of the month
  const monthStart = startOfMonth(date);
  // Get the last day of the month
  const monthEnd = endOfMonth(date);

  // Get the first Satday of the first week (may be in previous month)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 6 });
  // Get the last Friday of the last week (may be in next month)
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 6 });

  // Get all days between start and end
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });
  console.log(calendarDays);

  const today = new Date();

  // Filter Availabilities on this calendar views only
  const visibleAvailabilities = props.availabilities?.filter(
    (item) =>
      isWithinInterval(item.start, {
        start: calendarStart,
        end: calendarEnd,
      }) ||
      isWithinInterval(item.end, {
        start: calendarStart,
        end: calendarEnd,
      })
  );
  const visibleBookedSessions = props.bookedSessions?.filter(
    (item) =>
      isWithinInterval(item.start, {
        start: calendarStart,
        end: calendarEnd,
      }) ||
      isWithinInterval(item.end, {
        start: calendarStart,
        end: calendarEnd,
      })
  );

  return (
    <div className="flex overflow-auto divide-x h-full ">
      {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map(
        (day, ithDayWeek) => (
          <div
            key={day}
            className={cn(
              "py-2 text-center flex-grow text-lg font-medium border-b border-border",
              "flex flex-col h-full w-[200px]"
            )}
          >
            <div className="border-b text-muted-foreground ">{day}</div>
            <div className=" flex flex-col flex-grow">
              {calendarDays.map((calDate, ithDayOfCal) => {
                if (ithDayOfCal % 7 === ithDayWeek) {
                  return (
                    <div
                      key={ithDayOfCal}
                      className={cn(
                        "flex-grow border-b p-3 h-[100px]",
                        isWithinInterval(calDate, {
                          start: monthStart,
                          end: monthEnd,
                        })
                          ? ""
                          : "bg-muted/50 text-muted-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "rounded-full p-2",
                          isSameDay(today, calDate)
                            ? "text-orange-500 text-3xl"
                            : ""
                        )}
                      >
                        {calDate.getDate()}
                      </span>
                      <div className="flex flex-col items-center my-2">
                        {visibleAvailabilities &&
                          visibleAvailabilities.map(
                            (item, i) =>
                              isSameDay(item.start, calDate) && (
                                <span
                                  key={i}
                                  className={cn(
                                    "px-2 rounded-lg",
                                    item.booked
                                      ? "bg-orange-800"
                                      : "bg-transparent border-2 border-orange-500"
                                  )}
                                >
                                  {format(item.start, "p")} to{" "}
                                  {format(item.end, "p")}
                                </span>
                              )
                          )}
                        {visibleBookedSessions &&
                          visibleBookedSessions.map(
                            (item, i) =>
                              isSameDay(item.start, calDate) && (
                                <Sheet key={i}>
                                  <SheetTrigger>
                                    <span
                                      className={cn(
                                        "px-2 rounded-lg",
                                        isBefore(item.start, startOfToday())
                                          ? "bg-black text-zinc-500"
                                          : "bg-green-900 text-green-500"
                                      )}
                                    >
                                      {format(item.start, "p")} to{" "}
                                      {format(item.end, "p")}
                                    </span>
                                  </SheetTrigger>
                                  <SheetContent className="px-4">
                                    <SheetTitle className="p-5"></SheetTitle>
                                    <SessionDetailsSheet bookedSession={item} />
                                  </SheetContent>
                                </Sheet>
                              )
                          )}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )
      )}
    </div>
  );
}

//   <div
//     key={monthStart.toISOString()}
//     className="grid md:grid-cols-7 flex-grow overflow-y-auto relative"
//   >
//     {calendarDays.map((day) => {
//       // const dayEvents = visibleEvents.filter((event) =>
//       //   isSameDay(event.start, day)
//       // );
//       const isToday = isSameDay(day, today);
//       const isCurrentMonth = isSameMonth(day, date);

//       return (
//         <div
//           key={day.toISOString()}
//           className={cn(
//             "relative flex flex-col border-b border-r p-2 aspect-square cursor-pointer",
//             !isCurrentMonth && "bg-muted/50 hidden md:flex"
//           )}
//           // onClick={(e) => {
//           //   e.stopPropagation();
//           //   setDate(day);
//           //   setMode("day");
//           // }}
//         >
//           <div
//             className={cn(
//               "text-sm font-medium w-fit p-1 flex flex-col items-center justify-center rounded-full aspect-square",
//               isToday && "bg-primary text-background"
//             )}
//           >
//             {format(day, "d")}
//           </div>
//           <div className="flex flex-col gap-1 mt-1">
//             {/* {dayEvents.slice(0, 3).map((event) => (
//                   <CalendarEvent
//                     key={event.id}
//                     event={event}
//                     className="relative h-auto"
//                     month
//                   />
//                 ))} */}
//             {/* {dayEvents.length > 3 && (
//                   <motion.div
//                     key={`more-${day.toISOString()}`}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{
//                       duration: 0.2,
//                     }}
//                     className="text-xs text-muted-foreground"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setDate(day);
//                       setMode("day");
//                     }}
//                   >
//                     +{dayEvents.length - 3} more
//                   </motion.div>
//                 )} */}
//           </div>
//         </div>
//       );
//     })}
//   </div>
