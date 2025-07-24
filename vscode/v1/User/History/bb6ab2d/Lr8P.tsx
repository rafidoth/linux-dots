"use client";
import { useState } from "react";
import { QuestionTypeType } from "@/app/utils/types";
import Quiz from "@/app/components/Quiz";
import { cn } from "@/lib/utils";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import { SlEnergy } from "react-icons/sl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GenearatedQuizViewLoading from "./GeneratedQuizViewLoading";
import { useCurrentQuizsetCtx } from "../contexts/CurrentQuizset.context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";
import { btn_style } from "../config.jigao";

interface GeneratedQuizViewProps {
  generating: boolean;
  quantity: number;
  setQuantity: (quantity: number) => void;
  questionType: QuestionTypeType;
  setQuestionType: (questionType: QuestionTypeType) => void;
  generate: () => void;
}

export default function GeneratedQuizView({
  generating,
  setQuantity,
  setQuestionType,
  generate,
}: GeneratedQuizViewProps) {
  const [grid, setGrid] = useState<boolean>(true);
  const { currentQuizset } = useCurrentQuizsetCtx();
  return (
    <div
      className={`w-full max-h-full overflow-hidden  p-2 flex flex-col items-center`}
    >
      <div
        className={cn(
          "flex items-center justify-between w-full h-[40px] mb-2 pr-4"
        )}
      >
        <div className="border rounded-sm h-full flex items-center justify-center px-2">
          {currentQuizset?.questions.length}
        </div>
        <div></div>
        <Link href={`/t/${currentQuizset.quizset.id}`}>
          <button className={`${btn_style}`}>Create Exam</button>
        </Link>
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
                onValueChange={(val) =>
                  setQuestionType(val as QuestionTypeType)
                }
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
        <div className=" h-full cursor-pointer flex justify-center items-center border rounded-xl px-2 hover:bg-accent">
          {grid ? (
            <CiBoxList
              className="w-[32px] h-[32px]"
              onClick={() => setGrid(false)}
            />
          ) : (
            <CiGrid41
              className="w-[32px] h-[32px]"
              onClick={() => setGrid(true)}
            />
          )}
        </div>
      </div>
      {!generating && currentQuizset.questions.length > 0 && (
        <div
          className={cn(
            "h-screen flex overflow-auto scrollbar ",
            grid && "flex-wrap",
            !grid && "flex-col",
            "scrollbar-thumb-zinc-800",
            "gap-4 items-center justify-center"
          )}
        >
          {currentQuizset.questions.map((quiz, index) => (
            <Quiz grid={grid} key={index} index={index} quiz={quiz} />
          ))}
        </div>
      )}

      {generating && <GenearatedQuizViewLoading />}
      {/* <div className="w-[800px] h-[100px] bg-jigao/20 rounded-xl mt-4 scrollbar scrollbar-thumb-zinc-00">
        <LargeTextInputField />
      </div> */}
    </div>
  );
}
