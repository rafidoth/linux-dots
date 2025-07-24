import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSession } from "../context/SessionContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { fetchQuizset, getParticipationStatus } from "../api";
import ExamUI from "./UI/ExamUI";

export default function ExamContainer() {
  const { examId } = useParams();
  const session = useSession();
  const [exam, setExam] = useState(null);
  const [quizset, setQuizset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participationStatus, setParticipationStatus] = useState(null);

  useEffect(() => {
    const fetchExamData = async () => {
      if (!examId || !session?.user?.id) return;
      // check krte hbe
      // is this user is already a participant
      // is this exam is public?
      const { status } = await getParticipationStatus(
        examId,
        session?.user?.id
      );
      console.log(status);
      setParticipationStatus(status);

      setLoading(true);
      try {
        //
      } catch (err) {
        console.error("Error fetching exam data:", err);
        setError("Failed to load exam data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [examId, session?.user?.id]);

  return (
    <ExamUI
      participationStatus={participationStatus}
      session={session}
      error={error}
    />
  );
}
