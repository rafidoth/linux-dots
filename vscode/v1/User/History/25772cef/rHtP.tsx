"use client";
import { getQuizzes, SingleQuizInTest } from "@/app/utils/dbTest";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SingleQuizComp from "../../components/SingleQuizComp";

type Props = {};

// exam
function TestComponent({}: Props) {
  const { qid } = useParams() as { qid: string };
  const [quizzes, setQuizzes] = useState<SingleQuizInTest[]>([]);
  useEffect(() => {
    if (!qid) {
      console.error("No quizsetID in test");
      return;
    }
    const fun = async () => {
      const qzs: SingleQuizInTest[] | null = await getQuizzes(qid);
      if (qzs) {
        setQuizzes(qzs);
      } else {
        throw new Error("Error fetching questions in test");
      }
    };
    fun();
  }, []);
  return (
    <>
      <div className="w-screen h-screen flex justify-cente dark:bg-black ">
        <div
          className={`w-full flex justify-center p-10 m-10 dark:bg-zinc-950 rounded-xl overflow-auto scrollbar scrollbar-thumb-zinc-800 scroll-smooth`}
        >
          <div className="flex flex-col gap-2">
            <span className="text-3xl bg-jigao/30 px-2 rounded-xl">
              Company X Preliminary Selction exam
            </span>
            <div className="flex justify-between">
              <span>Time : 50 minutes</span>
              <span>Total Score : 100</span>
            </div>
            <div className={cn("flex flex-col gap-2")}>
              {quizzes.map((quiz, index) => {
                return <SingleQuizComp key={quiz.question.id} quiz={quiz} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestComponent;
