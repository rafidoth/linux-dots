"use client";
import ResizablePanelGen from "../../../components/ResizablePanelGen";
import { useEffect, useState } from "react";
import {
  MCQ_AI_ResponseType,
  MCQ_Type,
  QuestionTypeType,
  QuizSet_Type,
  QuizsetPageType,
  QuizsetType,
  QuizType,
} from "../../../utils/types";
import { dummyQuizzes } from "../../../utils/dummy";
import {
  fetchQuizSetsOfUserFromDB,
  fetchQuizsetWithIDFromDB,
  saveMCQtoDB,
} from "../../../utils/db";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useParams } from "next/navigation";
import {
  initialValue,
  useCurrentQuizsetCtx,
} from "@/app/contexts/CurrentQuizset.context";
import { useQuizSetCtx } from "@/app/contexts/Quizset.context";
import { get_MCQ_quizset } from "@/app/utils/dbRead";
import { getQuizzes } from "@/app/utils/dbTest";

type Props = {
  // params: Promise<{ quizsetID: string }>;
};

function TextPromptPage({}: Props) {
  const [generating, setGenerating] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [questionType, setQuestionType] = useState<QuestionTypeType>("mcq");

  const { isLoaded, user } = useUser();
  const { currentQuizset, setCurrentQuizset } = useCurrentQuizsetCtx();
  const { setQuizsets } = useQuizSetCtx();
  const { quizsetID } = useParams() as { quizsetID: string };

  const handleGenerate = async () => {
    if (currentQuizset.context.content.length === 0) {
      console.log("No content");
      return;
    }
    if (quantity === 0) {
      console.log("No quiz count");
      return;
    }
    console.log("Generating quiz");
    const data = {
      knowledge: currentQuizset.context.content,
      instructions: "",
      quantity: quantity,
      questionType: questionType,
    };
    setGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const { object }: { object: MCQ_AI_ResponseType[] } =
        await response.json();
      if (isLoaded && user) {
        let set: QuizsetType;
        if (currentQuizset.questions.length === 0) {
          set = await saveMCQtoDB(
            object,
            questionType,
            currentQuizset.context.content,
            user.id
          );
        } else {
          set = await saveMCQtoDB(
            object,
            questionType,
            currentQuizset.context.content,
            user.id,
            currentQuizset.quizset.id
          );
        }
        const fetchCurrentQuizsetFromDB: QuizSet_Type = await get_MCQ_quizset(
          set.id
        );
        setCurrentQuizset(fetchCurrentQuizsetFromDB);

        // for maintaining the quizset history
        const fetchedQuizsets: QuizsetType[] = await fetchQuizSetsOfUserFromDB(
          user.id
        );
        setQuizsets(fetchedQuizsets);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (!quizsetID) return;
    if (quizsetID === "new") {
      setCurrentQuizset(initialValue);
    } else {
      const fn = async () => {
        setGenerating(true);
        const current_quizset: QuizSet_Type = await get_MCQ_quizset(quizsetID);
        if (current_quizset) {
          setCurrentQuizset(current_quizset);
        }
        return setGenerating(false);
      };
      fn();
    }
  }, []);
  return (
    <ResizablePanelGen
      gen={generating}
      quantity={quantity}
      setQuantity={setQuantity}
      questionType={questionType}
      setQuestionType={setQuestionType}
      generate={handleGenerate}
    />
  );
}

export default TextPromptPage;
