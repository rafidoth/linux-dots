import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useEffect } from "react";
import { useState } from "react";

function getRemainingTime(targetDate) {
  const now = new Date();
  const days = differenceInDays(targetDate, now);
  const hours = differenceInHours(targetDate, now) % 24;
  const minutes = differenceInMinutes(targetDate, now) % 60;
  const seconds = differenceInSeconds(targetDate, now) % 60;

  return { days, hours, minutes, seconds };
}
function getFormattedRemainingTime(time) {
  const { days, hours, minutes, seconds } = time;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function ExamUI({ participationStatus, error, session, startTime }) {
  const remainingTime = getRemainingTime(startTime);
  const [rTimeStr, setRTimeStr] = useState(
    getFormattedRemainingTime(remainingTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = getRemainingTime(startTime);
      const newRTimeStr = getFormattedRemainingTime(newRemainingTime);
      setRTimeStr(newRTimeStr);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);
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
    return <ExamNonParticipantUI startTime={startTime} />;
  }

  if (participationStatus === "not participant") {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">
            Register yourself to access this exam.
          </p>
          <p>Exam will start at {startTime}</p>
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
          <p>Exam will start at {startTime}</p>
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
          <p>Exam will start at {format(startTime, "d MMMM, yyyy h.mm a")}</p>
          <p>Remaining time : {rTimeStr}</p>
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
}

function ExamNonParticipantUI({ startTime }) {
  console.log(new Date(startTime));
  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="text-center">
        <p className="text-lg font-medium">
          You are not registered for this exam.
        </p>
        <p>
          Exam will start at{" "}
          {/* {format(new Date(startTime), "d MMMM, yyyy h.mm a")} */}
        </p>
      </div>
    </div>
  );
}

export default ExamUI;
