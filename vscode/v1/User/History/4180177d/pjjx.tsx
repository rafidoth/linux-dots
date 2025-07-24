import React from "react";
import { MentorSuggestionType } from "../types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { jakarta } from "../utils/font";
import { getLevelColor } from "../utils/LevelColor";

type Props = {
  MentorDetails: MentorSuggestionType;
};

const MentorShowCard = (props: Props) => {
  const { MentorDetails } = props;

  return (
    <Card className="w-[300px] border-none">
      <CardHeader className="flex justify-center">
        <div className="flex gap-x-2">
          <Image
            src={MentorDetails.profile_pic}
            alt="Mentor Image"
            width={100}
            height={100}
            className="border-3 border-orange-800 rounded-lg"
          />
          <div className="flex flex-col">
            <span
              className={cn(
                "flex justify-end ",
                jakarta.className,
                "text-sm rounded-sm px-2 h-[20px] font-bold",
                getLevelColor(MentorDetails.level)
              )}
            >
              {MentorDetails.level.toUpperCase()}
            </span>

            <CardTitle className="text-4xl">{MentorDetails.name}</CardTitle>
          </div>
        </div>
        <span className="text-xl">{MentorDetails.organization}</span>
      </CardHeader>
    </Card>
  );
};

export default MentorShowCard;
