"use client";
import React, { useEffect, useState } from "react";
import { getMentorAvailableSlots } from "../lib/fetchers/student";
import { AvalabilityType, MentorPersonalInfoType } from "../types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { hover_style, smooth_hover, theme_border } from "./CustomStyles";
import { getMentorPersonalInfo } from "../lib/fetchers/mentor";
import Image from "next/image";

type Props = {
  mentorId: string;
};

const MentorScheduleForStudent = (props: Props) => {
  const mid = props.mentorId;
  const [selectedSlots, setSelectedSlots] = useState<AvalabilityType[]>([]);
  const [mentorFreeSlots, setMentorFreeSlots] = useState<AvalabilityType[]>([]);
  const [mentorInfo, setMentorInfo] = useState<MentorPersonalInfoType | null>(
    null
  );

  const dateWiseFiltered = new Map<number, AvalabilityType[]>();
  mentorFreeSlots.forEach((fslot) => {
    const date = fslot.start.getDate();
    if (dateWiseFiltered.has(date)) {
      dateWiseFiltered.set(date, [
        ...(dateWiseFiltered.get(date) || []),
        fslot,
      ]);
    } else {
      dateWiseFiltered.set(date, [fslot]);
    }
  });
  console.log(dateWiseFiltered);

  const dateWiseFilteredArray: {
    date: number;
    slots: AvalabilityType[];
  }[] = [];

  dateWiseFiltered.forEach((slots, date) => {
    dateWiseFilteredArray.push({
      date,
      slots,
    });
  });
  console.log(dateWiseFilteredArray);

  useEffect(() => {
    const fetchMentorSlots = async () => {
      const res: AvalabilityType[] = await getMentorAvailableSlots(mid);
      setMentorFreeSlots(res);
      const mentorDetails: MentorPersonalInfoType = await getMentorPersonalInfo(
        mid
      );
      setMentorInfo(mentorDetails);
    };
    fetchMentorSlots();
  }, [mid]);

  return (
    <div className="">
      {mentorInfo && (
        <div className="flex items-center gap-x-2 text-xl font-semibold my-4">
          <Image
            src={mentorInfo.profile_pic || "/placeholder-image.png"}
            alt="mentor image"
            width={60}
            height={60}
            className="border-3 border-orange-800 rounded-lg"
          />
          {mentorInfo.name}
        </div>
      )}
      {!mentorFreeSlots.length ? (
        <div>No Free Slot Available!</div>
      ) : (
        <div className="flex flex-col gap-y-2 items-center">
          {dateWiseFilteredArray.map((d) => (
            <div key={d.date}>
              <strong>{format(d.slots[0].start, "PP")}</strong>
              <div className="flex flex-wrap gap-x-2 mt-3">
                {d.slots.map((slot, i) => (
                  <span
                    className={cn(
                      "rounded-lg cursor-pointer px-2",
                      selectedSlots.some((s) => slot.id === s.id)
                        ? "bg-orange-800"
                        : theme_border + hover_style
                    )}
                    key={i}
                    onClick={() =>
                      setSelectedSlots((prev) =>
                        prev.some((s) => s.id === slot.id)
                          ? prev.filter((s) => s.id !== slot.id)
                          : [...prev, slot]
                      )
                    }
                  >
                    {format(slot.start, "p")} to {format(slot.end, "p")}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <span
            className={cn(
              "bg-orange-800 px-2 rounded-lg hover:bg-orange-800/60 select-none my-2",
              smooth_hover
            )}
          >
            Request
          </span>
        </div>
      )}
    </div>
  );
};

export default MentorScheduleForStudent;
