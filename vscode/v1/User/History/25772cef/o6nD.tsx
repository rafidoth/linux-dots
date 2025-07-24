import { getQuizzes, SingleQuizInTest } from "@/app/utils/dbTest";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SingleQuizComp from "../../components/SingleQuizComp";
import { cn } from "@/lib/utils";

type Props = {};

function Exam({}: Props) {
  const { qid } = useParams() as { qid: string };
}

export default Exam;
