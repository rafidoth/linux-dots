"use client";
import ResizablePanelGen from "../../../components/ResizablePanelGen";
import { useEffect, useState } from "react";
import {
  MCQ_AI_ResponseType,
  QuestionTypeType,
  QuizSet_Type,
  QuizsetType,
} from "../../../utils/types";
import { fetchQuizSetsOfUserFromDB, saveMCQtoDB } from "../../../utils/db";
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

type Props = {};

function QuizsetPage({}: Props) {
  const [generating, setGenerating] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [questionType, setQuestionType] = useState<QuestionTypeType>("mcq");

  const { isLoaded, user } = useUser();
  const { currentQuizset, setCurrentQuizset } = useCurrentQuizsetCtx();
  const { setQuizsets } = useQuizSetCtx();
  const { quizsetID } = useParams() as { quizsetID: string };

  return (
    <ResizablePanelGen
      quantity={quantity}
      setQuantity={setQuantity}
      questionType={questionType}
      setQuestionType={setQuestionType}
    />
  );
}

export default QuizsetPage;
