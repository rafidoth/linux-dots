import { getQuizzes, SingleQuizInTest } from "@/app/utils/dbTest";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SingleQuizComp from "../../components/SingleQuizComp";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

type Props = {};

function Exam({}: Props) {
  const { qid } = useParams() as { qid: string };
  const user = currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return;
}

export default Exam;
