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
import React from "react";

type Props = { params: Promise<{ qid: string }> };
async function QuizsetPage({ params }: Props) {
  const qid = (await params).qid;
  return <ResizablePanelGen qid={qid} />;
}

export default QuizsetPage;
