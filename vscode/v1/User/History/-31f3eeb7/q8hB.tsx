"use client";
import { getSessionAndAvailabilityByIds } from "@/app/lib/fetchers/mentor";
import { sendPaymentRequest } from "@/app/lib/mutations/student";
import { AvalabilityType, SessionInfoType } from "@/app/types";
import { gradientText1, smooth_hover } from "@/app/ui/CustomStyles";
import SessionCard from "@/app/ui/SessionCard";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const StudentPayment = () => {
  const searchParams = useSearchParams();
  const sessionID = searchParams.get("s");
  const availabilityID = searchParams.get("a");
  const [sessionInfo, setSessionInfo] = useState<SessionInfoType | null>(null);
  const [fslot, setFslot] = useState<AvalabilityType | null>(null);

  const handlePayNow = () => {
    if (sessionID && availabilityID) {
      sendPaymentRequest(sessionID, availabilityID);
    } else {
      throw new Error("Payment Page URL SessionId or AvailabilityID not found");
    }
  };

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
      <div className="flex gap-x-10">
        {sessionInfo && (
          <SessionCard
            student={true}
            sessionDetails={sessionInfo}
            checkoutpage={true}
          />
        )}
        <div className="flex flex-col ">
          <div className="flex flex-col my-5">
            <span className="text-xl font-semibold">Selected Slot</span>
            {fslot && (
              <span className={`text-3xl font-semibold ${gradientText1}`}>
                {format(fslot.start, "PPP")}
              </span>
            )}
            <div className="flex flex-col justify-between">
              <span>
                {fslot && (
                  <span className="bg-orange-800 text-xl px-2 font-semiboldl rounded-md">
                    {format(fslot.start, "p")} to {format(fslot.end, "p")}
                  </span>
                )}
              </span>
            </div>
          </div>

          <div>
            <span
              className={cn(
                "text-2xl font-semibold bg-orange-800/30 hover:bg-orange-800 flex justify-center rounded-xl select-none",
                smooth_hover
              )}
              onClick={handlePayNow}
            >
              Pay Now{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPayment;
