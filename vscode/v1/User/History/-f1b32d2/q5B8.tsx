import type { SingleQuizInTest } from "@/app/utils/dbTest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  quiz: SingleQuizInTest;
};
const opt: string = "hover:bg-jigao/30 border hover:border-jigao p-2";
const option: string = "bg-jigao rounded-sm w-[16px] h-[16px] py-1 px-3";

function SingleQuizComp({ quiz }: Props) {
  const handleSelect = (choice: number) => {
    console.log(choice);
  };
  return (
    <Card className={cn(" p-2 text-2xl", "border-none")}>
      <CardHeader>
        <CardTitle>{quiz.question.question}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 w-full gap-x-3">
        <div className="flex flex-col gap-2 w-1/2">
          <span className={opt} onClick={() => handleSelect(0)}>
            <span className={option}>a</span> {quiz.options[0].choiceText}
          </span>
          <span className={opt} onClick={() => handleSelect(1)}>
            <span className={option}>c</span> {quiz.options[1].choiceText}
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className={opt} onClick={() => handleSelect(2)}>
            <span className={option}>b</span> {quiz.options[2].choiceText}
          </span>
          <span className={opt} onClick={() => handleSelect(3)}>
            <span className={option}>d</span> {quiz.options[3].choiceText}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default SingleQuizComp;
