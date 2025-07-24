import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Countdown from "./Countdown";

function ExamUI({ participationStatus, error, session, startTime }) {
  let ExamComp = null;
  if (!participationStatus) {
    return <ExamNonParticipantUI startTime={startTime} />;
  }

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

  if (participationStatus === "not participant") {
    ExamComp = (
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
    ExamComp = (
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
    ExamComp = (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">
            You are the creator of this exam.
          </p>
          <p>Exam will start at {format(startTime, "d MMMM, yyyy h.mm a")}</p>
          Remaining time : <Countdown startTime={startTime} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full p-8">
      <Button onClick={session.signOut} variant={"secondary"}>
        Sign Out
      </Button>
      {ExamComp}
    </div>
  );
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
        <Countdown startTime={startTime} />
      </div>
    </div>
  );
}

export default ExamUI;
