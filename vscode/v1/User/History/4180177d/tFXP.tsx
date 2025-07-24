import React from "react";
import { MentorSuggestionType } from "../types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { jakarta, metamorphous } from "../utils/font";
import { getLevelColor } from "../utils/LevelColor";

type Props = {
  MentorDetails: MentorSuggestionType;
};

const MentorShowCard = (props: Props) => {
  const { MentorDetails } = props;

  return (
    <Card className="w-[300px] border-none">
      <CardHeader className="flex justify-center">
        <div className="flex">
          <Image
            src={MentorDetails.profile_pic}
            alt="Mentor Image"
            width={100}
            height={100}
            className="border-3 border-orange-800 rounded-lg"
          />

          <span
            className={cn(
              "flex justify-end",
              jakarta.className,
              "text-sm rounded-sm px-2 h-[20px] gap-x-2",
              getLevelColor(MentorDetails.level)
            )}
          >
            {MentorDetails.level.toUpperCase()}
          </span>
        </div>
        <CardTitle className="text-4xl">{MentorDetails.name}</CardTitle>
        <span className="text-xl">{MentorDetails.organization}</span>
      </CardHeader>
    </Card>
  );
};

export default MentorShowCard;
