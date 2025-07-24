"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EyeNoneIcon } from "@radix-ui/react-icons";
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { MdOutlineCrisisAlert } from "react-icons/md";
import { MCQ_Type, MCQType, QuizType } from "@/app/utils/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getChoices,
  getCorrectAnswer,
  getCorrectAnswerIdx,
} from "../utils/processData";
import { removeQuestion } from "../utils/dbDelete";
import { get_MCQ_quizset } from "../utils/dbRead";
import {
  CurrentQuizsetContextProvider,
  useCurrentQuizsetCtx,
} from "../contexts/CurrentQuizset.context";
import { toast } from "sonner";

interface QuizProps {
  quiz: MCQ_Type;
  index: number;
  grid?: boolean;
}

export default function Quiz({ quiz, index, grid }: QuizProps) {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [showAnswer, setShowAnswer] = useState<boolean>(true);
  const letter: string[] = ["A", "B", "C", "D"];
  const correctAnswer = letter[getCorrectAnswerIdx(quiz.answer.answer)];
  const { currentQuizset, setCurrentQuizset } = useCurrentQuizsetCtx();

  const handleDelete = async () => {
    const nonFiltered = [...currentQuizset.questions];
    const filtered = currentQuizset.questions.filter(
      (q) => q.question.id !== quiz.question.id
    );
    setCurrentQuizset({ ...currentQuizset, questions: filtered });
    const undo = () => {
      setCurrentQuizset({ ...currentQuizset, questions: nonFiltered });
      toast.dismiss();
    };

    const deleteFromDB = async () => {
      await removeQuestion(quiz.question.id);
      const data = await get_MCQ_quizset(quiz.question.quizsetID);
      setCurrentQuizset(data);
    };

    toast(`Question ${index + 1} has been deleted`, {
      icon: <MdOutlineCrisisAlert />,
      onDismiss: deleteFromDB,
      onAutoClose: deleteFromDB,
      action: (
        <button
          onClick={undo}
          className={`
          ${"text-sm bg-blue-700 hover:bg-blue-600 text-white w-[60px] rounded-xl"}  
        `}
        >
          Undo
        </button>
      ),
    });
  };

  return (
    <Card
      className={cn(
        "bg-blue-400/5 dark:bg-zinc-900  rounded-xl border-none",
        !grid && "w-[600px]",
        grid && "w-[400px]"
      )}
    >
      <CardHeader className="flex flex-col ">
        <div className="flex justify-end">
          <span className="text-2xl">{index + 1}</span>
        </div>
        <span
          className={cn("p-2 rounded-t-xl", "text-xl", !grid && "text-2xl")}
        >
          {quiz.question.question}
        </span>
      </CardHeader>
      <CardContent>
        {getChoices(quiz.choices).map((choice, i) => (
          <div
            key={i + 1}
            className={cn("flex items-center space-x-2", !grid && "text-xl")}
          >
            <div
              onClick={() => setSelected(letter[i])}
              className={cn(
                "flex items-center gap-x-4 ",
                selected !== letter[i] && "hover:bg-accent",
                "w-full cursor-pointer px-2 py-2 rounded-xl",
                selected === letter[i] &&
                  selected === correctAnswer &&
                  "bg-green-400/50 dark:bg-green-950/50 ",
                selected === letter[i] &&
                  selected !== correctAnswer &&
                  " bg-red-400/50 dark:bg-red-900/50 "
              )}
            >
              <span
                className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-full",
                  selected === letter[i] && "bg-accent ",
                  selected !== letter[i] && "bg-accent"
                )}
              >
                {letter[i]}
              </span>
              <span>{choice}</span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        {!showAnswer && (
          <div className={"flex flex-col w-full"}>
            <div className={`w-full flex justify-between`}>
              <span
                className={`cursor-pointer bg-green-900/80
            hover:bg-green-900/50 rounded px-1
            `}
                onClick={() => setShowAnswer(true)}
              >
                {getCorrectAnswer(quiz.answer.answer, quiz.choices)}
              </span>
              <span
                className={`cursor-pointer `}
                onClick={() => setShowAnswer(true)}
              >
                <EyeNoneIcon className={`w-4 h-4 hover:text-rose-500 `} />
              </span>
            </div>
            {quiz.answer.answer_explanation}
          </div>
        )}
        <div className="w-full flex justify-between pt-2 gap-x-4 border-t border-dashed">
          {showAnswer && (
            <span
              className={`cursor-pointer bg-jigao/80 hover:bg-jigao/40 text-white
            rounded-xl px-2
            `}
              onClick={() => setShowAnswer(false)}
            >
              Show Answer
            </span>
          )}
          <div className="flex justify-end gap-x-4">
            <button>
              <MdEditSquare className=" cursor-pointer hover:text-blue-500 transition-colors" />
            </button>
            <button onClick={() => handleDelete()}>
              <FaTrashAlt className=" cursor-pointer hover:text-red-500 transition-colors" />
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
