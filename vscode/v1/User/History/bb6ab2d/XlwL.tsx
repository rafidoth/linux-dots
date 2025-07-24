"use client";
import { useState } from "react";
import { QuestionTypeType } from "@/app/utils/types";
import Quiz from "@/app/components/Quiz";
import { cn } from "@/lib/utils";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import GenearatedQuizViewLoading from "./GeneratedQuizViewLoading";
import { useCurrentQuizsetCtx } from "@/app/contexts/CurrentQuizset.context";
import GenerateBtn from "./GenerateBtn";
import CreateExamBtn from "./CreateExamBtn";

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
      className={`w-full max-h-full overflow-hidden  py-2 flex flex-col items-center`}
    >
      <div
        className={cn(
          "flex items-center justify-between w-full h-[40px] mb-2 px-6"
        )}
      >
        <div className={cn("h-full flex items-center justify-center  gap-2")}>
          <div
            className={cn(
              "border rounded-full h-full flex items-center justify-center",
              " px-2 bg-jigao/30 border-transparent font-semibold"
            )}
          >
            {currentQuizset?.questions.length}
          </div>
          <GenerateBtn
            setQuantity={(x: number) => setQuantity(x)}
            setQuestionType={setQuestionType}
            generate={generate}
          />
          <CreateExamBtn />
        </div>
        <div className={cn("h-full flex items-center justify-center gap-2")}>
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
