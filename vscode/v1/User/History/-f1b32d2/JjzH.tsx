import type { SingleQuizInTest } from "@/app/utils/dbTest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  quiz: SingleQuizInTest;
};

function SingleQuizComp({ quiz }: Props) {
  const handleSelect = (choice: number) => {
    console.log(choice);
  };
  return (
    <Card className={cn("w-[600px] text-2xl", "border-none")}>
      <CardHeader>
        <CardTitle>{quiz.question.question}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 w-full ">
        <div className="flex flex-col gap-2 w-1/2">
          <span onClick={() => handleSelect(0)}>
            <span className="bg-jigao rounded-sm w-[24px] h-[24px] px-1">
              a
            </span>{" "}
            {quiz.options[0].choiceText}
          </span>
          <span onClick={() => handleSelect(0)}>
            <span className="bg-jigao rounded-sm w-[24px] h-[24px] px-1">
              c
            </span>{" "}
            {quiz.options[1].choiceText}
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span onClick={() => handleSelect(0)}>
            <span className="bg-jigao rounded-sm w-[24px] h-[24px] px-1">
              b
            </span>{" "}
            {quiz.options[2].choiceText}
          </span>
          <span onClick={() => handleSelect(0)}>
            <span className="bg-jigao rounded-sm w-[24px] h-[24px] px-1">
              d
            </span>{" "}
            {quiz.options[3].choiceText}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default SingleQuizComp;
