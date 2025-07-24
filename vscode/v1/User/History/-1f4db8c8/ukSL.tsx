"use client";
import { getGroupSessionsList } from "@/app/lib/student/fetchers";
import { GroupSessionInfoType } from "@/app/types";
import { smooth_hover } from "@/app/ui/CustomStyles";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Clock, Hourglass } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const colors = [
  {
    bg: "bg-orange-800",
    text: "text-orange-500",
  },
  {
    bg: "bg-blue-800",
    text: "text-blue-500",
  },
  {
    bg: "bg-green-800",
    text: "text-green-500",
  },
  {
    bg: "bg-red-800",
    text: "text-red-500",
  },
  {
    bg: "bg-purple-800",
    text: "text-purple-500",
  },
  {
    bg: "bg-yellow-800",
    text: "text-yellow-500",
  },
  {
    bg: "bg-teal-800",
    text: "text-teal-500",
  },
  {
    bg: "bg-pink-800",
    text: "text-pink-500",
  },
];

export const minutesToHours = (minutes: number) => {
  const hours: number = Math.floor(minutes / 60);
  const remain = minutes % 60;
  if (remain > 0) {
    return `${hours} hours ${remain} minutes`;
  } else {
    return `${hours} hours`;
  }
};

const GroupSessionPage = () => {
  const [gsInfo, setGsInfo] = useState<GroupSessionInfoType[] | null>(null);
  useEffect(() => {
    const fn = async () => {
      const data: GroupSessionInfoType[] = await getGroupSessionsList();
      setGsInfo(data);
    };
    fn();
  }, []);
  return (
    <ScrollArea className="h-screen">
      <div className="p-16 flex flex-wrap gap-10">
        {gsInfo &&
          gsInfo.map((grpSession, i) => (
            <GroupSessionCard
              key={grpSession.id}
              GroupSessionDetails={grpSession}
              ColorTheme={colors[i % colors.length]}
            />
          ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

type Props = {
  GroupSessionDetails: GroupSessionInfoType;
  ColorTheme: {
    bg: string;
    text: string;
  };
};

const GroupSessionCard = ({ GroupSessionDetails, ColorTheme }: Props) => {
  const router = useRouter();
  const handleGSClick = () => {
    router.replace(
      `/s/group-sessions/${GroupSessionDetails.id}?bg=${ColorTheme.bg}&text=${ColorTheme.text}`
    );
  };
  return (
    <Card
      className={cn(
        "w-[700px] hover:opacity-90 select-none border-none",
        ColorTheme.bg
      )}
      onClick={handleGSClick}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2 font-semibold">
            <Image
              className="rounded-full border-2 border-white"
              src={GroupSessionDetails.mentorPhotoLink}
              alt="mentor image"
              width={50}
              height={50}
            />
            <span>{GroupSessionDetails.mentorName}</span>
          </div>
          <div>
            {GroupSessionDetails.participantCount}/
            {GroupSessionDetails.participantTotal}
          </div>
        </div>
        <CardTitle className={cn("text-8xl font-black ", ColorTheme.text)}>
          {GroupSessionDetails.Title}
        </CardTitle>
        <div className="flex justify-between my-2">
          <span className="flex  gap-x-4 font-semibold">
            <span className="flex gap-x-2">
              <Hourglass />
              {minutesToHours(GroupSessionDetails.DurationInMinutes)}
            </span>
            <span className="flex gap-x-2">
              <Clock />
              {format(GroupSessionDetails.StartTime, "Pp")}
            </span>
          </span>
          <span
            className={cn(
              "font-semibold cursor-pointer hover:opacity-80",
              smooth_hover
            )}
          >
            {" "}
            Book A Seat
          </span>
        </div>
      </CardHeader>
    </Card>
  );
};

export default GroupSessionPage;
