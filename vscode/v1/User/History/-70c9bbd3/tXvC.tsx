"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SessionInfoType } from "../types";
import { Clock, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import { hover_style, smooth_hover, theme_border } from "./CustomStyles";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MentorScheduleForStudent from "./MentorScheduleForStudent";
import { minutesToHours } from "../(student)/s/group-sessions/page";

type Props = {
  sessionDetails: SessionInfoType;
  student: boolean;
  checkoutpage?: boolean;
};

const SessionCard = ({ sessionDetails, student, checkoutpage }: Props) => {
  return (
    <Card className="w-[350px] my-5 text-lg border-none bg-zinc-900/50">
      <CardHeader>
        <CardTitle className="text-3xl">{sessionDetails.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-lg">
        {student && (
          <div className="flex gap-x-2">
            <Image
              className="border-2 border-orange-800 rounded-lg"
              src={sessionDetails.mentorImageLink}
              alt="mentor image"
              width={30}
              height={30}
            />
            <span>{sessionDetails.mentorName}</span>
          </div>
        )}
        <div>
          <span className="bg-orange-800 px-2 rounded-md py-1">
            {sessionDetails.type}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6" />
          <span>{minutesToHours(sessionDetails.DurationInMinutes)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Banknote className="w-6 h-6" />
          <span>৳{sessionDetails.Price}</span>
        </div>
        <div className="flex gap-2">
          {sessionDetails.session_medium.map((medium) => (
            <span key={medium} className=" bg-secondary px-2 py-1 rounded">
              {medium}
            </span>
          ))}
        </div>
        <CardDescription className="whitespace-pre-line text-lg">
          {sessionDetails.Description}
        </CardDescription>
      </CardContent>
      {!student && (
        <CardFooter className="flex gap-2">
          <Button size="sm" className="cursor-pointer">
            Edit
          </Button>
          <Button variant="destructive" size="sm" className="cursor-pointer">
            Delete
          </Button>
        </CardFooter>
      )}
      {student && (
        <CardFooter className="flex justify-end gap-2">
          <Popover>
            <PopoverTrigger>
              {!checkoutpage && (
                <span
                  className={cn(
                    theme_border,
                    hover_style,
                    smooth_hover,
                    "px-4 cursor-pointer"
                  )}
                >
                  Book Session
                </span>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-[400px]">
              <MentorScheduleForStudent sessionDetails={sessionDetails} />
            </PopoverContent>
          </Popover>
        </CardFooter>
      )}
    </Card>
  );
};

export default SessionCard;
