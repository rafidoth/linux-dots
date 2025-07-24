"use client";
import { getSessionAndAvailabilityByIds } from "@/app/lib/fetchers/availability";
import { AvalabilityType, SessionInfoType } from "@/app/types";
import { gradientText1 } from "@/app/ui/CustomStyles";
import MentorScheduleForStudent from "@/app/ui/MentorScheduleForStudent";
import SessionCard from "@/app/ui/SessionCard";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const StudentPayment = () => {
  const searchParams = useSearchParams();
  const sessionID = searchParams.get("s");
  const availabilityID = searchParams.get("a");
  const [sessionInfo, setSessionInfo] = useState<SessionInfoType | null>(null);
  const [fslot, setFslot] = useState<AvalabilityType | null>(null);

  useEffect(() => {
    const fn = async () => {
      if (sessionID && availabilityID) {
        const data = await getSessionAndAvailabilityByIds(
          sessionID,
          availabilityID
        );
        setSessionInfo(data.session);
        setFslot(data.freeslot);
      }
    };

    fn();
  }, []);
  return (
    <div className="p-16">
      <span className={`text-5xl font-semibold ${gradientText1}`}>
        Checkout
      </span>
      <div className="flex gap-x-10 items-center">
        {sessionInfo && (
          <SessionCard student={true} sessionDetails={sessionInfo} />
        )}
        <div className="flex flex-col">
          <span className="text-xl font-semibold">Selected Slot</span>
          {fslot && (
            <span className={`text-3xl font-semibold ${gradientText1}`}>
              {format(fslot.start, "PPP")}
            </span>
          )}
          <div>
            {fslot && (
              <span className="bg-orange-800 text-xl px-2 font-semiboldl rounded-md">
                {format(fslot.start, "p")} to {format(fslot.end, "p")}
              </span>
            )}
          </div>
          {sessionInfo && (
            <MentorScheduleForStudent
              sessionDetails={sessionInfo}
              checkoutPage={true}
            />
          )}
        </div>
      </div>

      <div>{fslot?.id}</div>
    </div>
  );
};

export default StudentPayment;
