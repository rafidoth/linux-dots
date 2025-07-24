"use client";
import React, { useEffect, useState } from "react";
import { getMentorAvailableSlots } from "../lib/fetchers/student";
import {
  AvalabilityType,
  MentorPersonalInfoType,
  SessionInfoType,
} from "../types";
import { format, intervalToDuration } from "date-fns";
import { cn } from "@/lib/utils";
import { hover_style, smooth_hover, theme_border } from "./CustomStyles";
import { getMentorPersonalInfo } from "../lib/fetchers/mentor";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  sessionDetails: SessionInfoType;
};

const MentorScheduleForStudent = (props: Props) => {
  const mid = props.sessionDetails.mentorId;
  const [selectedSlot, setSelectedSlot] = useState<AvalabilityType | null>();
  const [mentorFreeSlots, setMentorFreeSlots] = useState<AvalabilityType[]>([]);
  const [mentorInfo, setMentorInfo] = useState<MentorPersonalInfoType | null>(
    null
  );
  const { sessionDetails } = props;
  const router = useRouter();

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

  const dateWiseFilteredArray: {
    date: number;
    slots: AvalabilityType[];
  }[] = [];

  dateWiseFiltered.forEach((slots, date) => {
    // filter slots with lower duration than session
    const possibleSlots: AvalabilityType[] = slots
      .map((s) => {
        const durationOfFreeSlot = intervalToDuration({
          start: s.start,
          end: s.end,
        });
        let minutes: number = durationOfFreeSlot.minutes ?? 0;
        if (durationOfFreeSlot.hours) {
          minutes += durationOfFreeSlot.hours * 60;
        }
        if (minutes >= sessionDetails.DurationInMinutes) {
          return s;
        }
        return undefined;
      })
      .filter(Boolean) as AvalabilityType[];
    if (possibleSlots.length) {
      dateWiseFilteredArray.push({
        date,
        slots: possibleSlots,
      });
    }
  });

  const goToPayment = () => {
    router.replace(
      `/s/payment?s=${sessionDetails.sessionId}&a=${selectedSlot?.id}`
    );
  };

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
          <div>
            {dateWiseFilteredArray.map((d) => (
              <div key={d.date} className="my-2">
                <strong>{format(d.slots[0].start, "PP")}</strong>
                <div className="flex flex-wrap gap-x-2 mt-3">
                  {d.slots.map((slot, i) => (
                    <span
                      className={cn(
                        "rounded-lg cursor-pointer px-2",
                        selectedSlot?.id === slot.id
                          ? "bg-orange-800"
                          : theme_border + hover_style
                      )}
                      key={i}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {format(slot.start, "p")} to {format(slot.end, "p")}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end w-full">
            <span
              className={cn(
                "bg-orange-800 px-2 rounded-lg hover:bg-orange-800/60 select-none my-2",
                smooth_hover
              )}
              onClick={goToPayment}
            >
              Book
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorScheduleForStudent;
