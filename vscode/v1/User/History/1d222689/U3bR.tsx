import {
  getMentorBasedOnInterest,
  getMentorBasedOnLevel,
} from "@/app/lib/fetchers/student";
import { MentorSuggestionType } from "@/app/types";
import FindMentorRow from "@/app/ui/FindMentorRow";
import MentorShowCard from "@/app/ui/MentorShowCard";
import { jakarta } from "@/app/utils/font";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const mentorsOnInterest: MentorSuggestionType[] =
    await getMentorBasedOnInterest();
  const mentorOnTopRated: MentorSuggestionType[] =
    await getMentorBasedOnLevel();
  return (
    <div className="px-16">
      <div className="flex justify-end items-center">
        <div
          className={cn(
            "font-semibold text-5xl  px-2 pb-2 my-6 z-10 ",
            jakarta.className,
            "border-b-2 border-orange-800"
          )}
        >
          Find Mentor
        </div>
      </div>
      <ScrollArea>
        <div className="flex ">
          {mentorsOnInterest.map((m, i) => (
            <MentorShowCard key={i} MentorDetails={m} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default page;
