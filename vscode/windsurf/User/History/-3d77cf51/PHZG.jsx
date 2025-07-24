import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSession } from "../context/SessionContext";
import ExamUI from "./UI/ExamUI";
import { getExamStatus } from "../api";

export default function ExamContainer() {
  const { examId } = useParams();
  const session = useSession();
  const [exam, setExam] = useState(null);
  const [quizset, setQuizset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [examStatus, setExamStatus] = useState(null);

  useEffect(() => {
    const fetchExamData = async () => {
      if (!examId || !session?.user?.id) return;
      const status = await getExamStatus(examId, session?.user?.id);
      setExamStatus(status);
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
      startTime={startTime}
      session={session}
      error={error}
    />
  );
}
