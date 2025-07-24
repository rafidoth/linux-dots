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
import { io } from "socket.io-client";

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
      const { status } = await getParticipationStatus(
        examId,
        session?.user?.id
      );
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

    const s = io(import.meta.env.VITE_SERVER_URL);
    s.on("exam-id", (ackCb) => {
      ackCb({ examId, userId: session.user.id });
    });
  }, [examId, session?.user?.id]);

  return (
    <ExamUI
      participationStatus={participationStatus}
      session={session}
      error={error}
    />
  );
}
