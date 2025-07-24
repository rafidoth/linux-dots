import { getQuizzes, SingleQuizInTest } from "@/app/utils/dbTest";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SingleQuizComp from "../../components/SingleQuizComp";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

type Props = { params: Promise<{ qid: string }> };

async function Exam({ params }: Props) {
  const user = currentUser();
  const qid = (await params).qid;
  if (!user) {
    redirect("/sign-in");
  } else {
  }
  return;
}

export default Exam;
