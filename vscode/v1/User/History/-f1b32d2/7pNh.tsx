import type { SingleQuizInTest } from "@/app/utils/dbTest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  quiz: SingleQuizInTest;
  index: number;
};
const opt: string =
  "hover:bg-jigao/30 border border-transparent hover:border-jigao p-2 rounded-xl cursor-pointer";
const selected_opt = "bg-jigao text-white p-2 rounded-xl cursor-pointer";
const option: string = "bg-jigao rounded-sm w-[16px] h-[16px] py-1 px-3";
function getCls(choice: number, selected: number | null) {
  if (selected === null) return opt;
  if (choice === selected) return selected_opt;
  return opt;
}

function SingleQuizComp({ quiz, index }: Props) {
  const [selected, setSelected] = React.useState<number | null>(null);

  const handleSelect = (choice: number) => {
    setSelected(choice);
  };

  return (
    <Card className={cn(" p-2 text-2xl", "border-none")}>
      <CardHeader>
        <CardTitle>
          {index + 1}. {quiz.question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 w-full gap-x-3">
        <div className="flex flex-col gap-2 w-1/2">
          <span className={getCls(0, selected)} onClick={() => handleSelect(0)}>
            <span className={option}>a</span> {quiz.options[0].choiceText}
          </span>
          <span className={getCls(1, selected)} onClick={() => handleSelect(1)}>
            <span className={option}>c</span> {quiz.options[1].choiceText}
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className={getCls(2, selected)} onClick={() => handleSelect(2)}>
            <span className={option}>b</span> {quiz.options[2].choiceText}
          </span>
          <span className={getCls(3, selected)} onClick={() => handleSelect(3)}>
            <span className={option}>d</span> {quiz.options[3].choiceText}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default SingleQuizComp;
