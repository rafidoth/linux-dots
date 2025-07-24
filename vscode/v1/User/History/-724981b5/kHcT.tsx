import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { SlEnergy } from "react-icons/sl";
import { DialogClose } from "@radix-ui/react-dialog";
import { btn_style } from "@/app/config.jigao";
import { useCurrentQuizsetCtx } from "@/app/contexts/CurrentQuizset.context";
import { QuestionTypeType } from "@/app/utils/types";
type Props = {
  setQuantity: (x: number) => void;
  setQuestionType: (questionType: QuestionTypeType) => void;
  generate: () => void;
};

function GenerateBtn({ setQuantity, setQuestionType, generate }: Props) {
  const { currentQuizset } = useCurrentQuizsetCtx();
  return (
    <Dialog>
      <DialogTrigger>
        <div className={`${btn_style}`}>
          <SlEnergy />{" "}
          {currentQuizset?.questions.length === 0
            ? "Generate"
            : "Generate More"}
        </div>
      </DialogTrigger>
      <DialogContent className="bg-accent text-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl">
            Quiz Generation Settings
          </DialogTitle>
        </DialogHeader>
        <div className=" cursor-pointer flex  flex-col justify-start  border rounded-xl px-2 hover:bg-accent">
          <p className="font-semibold ">Number of Questions</p>
          <Select onValueChange={(e) => setQuantity(parseInt(e))}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="No. of Questions" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((i) => {
                return (
                  <SelectItem key={i} value={i.toString()}>
                    {i} Questions
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="  cursor-pointer flex flex-col justify-start  border rounded-xl px-2 hover:bg-accent">
          <p className="font-semibold ">Question Type</p>
          <Select
            onValueChange={(val) => setQuestionType(val as QuestionTypeType)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {[
                "MCQ (Multiple Choice Questions) ",
                "true/false",
                "Fill In the Blank",
                "Short Question",
              ].map((type, i) => {
                const values: QuestionTypeType[] = [
                  "mcq",
                  "truefalse",
                  "fillintheblanks",
                  "short",
                ];
                return (
                  <SelectItem key={type} value={values[i]}>
                    {type}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <DialogClose>
          <div
            onClick={() => generate()}
            className="h-full w-[200px] bg-jigao/30 cursor-pointer flex justify-center items-center rounded-xl px-4 hover:bg-jigao/20 "
          >
            <SlEnergy />{" "}
            {currentQuizset?.questions.length === 0
              ? "Generate"
              : "Generate More"}
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default GenerateBtn;
