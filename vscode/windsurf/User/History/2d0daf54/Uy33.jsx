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

export default function Exam() {
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
  if (!session?.user?.id) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">
            Please login to access this exam.
          </p>
          <Button onClick={session.signInWithGoogle}>Login</Button>
        </div>
      </div>
    );
  }

  if (!participationStatus) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">Loading participation status...</p>
        </div>
      </div>
    );
  }

  if (participationStatus === "not participant") {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">
            Register yourself to access this exam.
          </p>
        </div>
      </div>
    );
  }

  if (participationStatus === "participant") {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">
            You are already registered for this exam.
          </p>
        </div>
      </div>
    );
  }

  if (participationStatus === "creator") {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">
            You are the creator of this exam.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">Loading exam details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-xl text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-xl">Exam Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The exam you are looking for does not exist or you don't have
              permission to view it.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const examStartTime = new Date(exam.start_time);
  const now = new Date();
  const isExamActive =
    now >= examStartTime &&
    now < new Date(examStartTime.getTime() + exam.duration_minutes * 60000);
  const examStatus = isExamActive
    ? "Active"
    : now < examStartTime
    ? "Upcoming"
    : "Completed";

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">{exam.title}</CardTitle>
              <CardDescription className="text-sm mt-1">
                Exam ID: {examId}
              </CardDescription>
            </div>
            <Badge
              className={`px-3 py-1 ${
                examStatus === "Active"
                  ? "bg-green-500"
                  : examStatus === "Upcoming"
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
            >
              {examStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-gray-500">
                Scheduled Time
              </h3>
              <p className="font-medium">{examStartTime.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500">Duration</h3>
              <p className="font-medium">{exam.duration_minutes} minutes</p>
            </div>
          </div>

          <Separator />

          {quizset && (
            <div className="space-y-4">
              <h3 className="font-medium">Quiz Details</h3>
              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p>{quizset.quizsetTitle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Questions</p>
                <p>{quizset.quizzes?.length || 0}</p>
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Exam Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Creator Participation</p>
                <p>
                  {exam.examPreferences.creatorAllowed
                    ? "Allowed"
                    : "Not Allowed"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Question Order</p>
                <p>{exam.examPreferences.shuffle ? "Shuffled" : "Fixed"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Visibility</p>
                <p>{exam.examPreferences.isPublic ? "Public" : "Private"}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
          {isExamActive && <Button>Enter Exam</Button>}
          {!isExamActive && now < examStartTime && (
            <Button disabled>
              Starts in {Math.ceil((examStartTime - now) / (1000 * 60))} minutes
            </Button>
          )}
          {!isExamActive &&
            now >
              new Date(
                examStartTime.getTime() + exam.duration_minutes * 60000
              ) && <Button variant="secondary">View Results</Button>}
        </CardFooter>
      </Card>
    </div>
  );
}
