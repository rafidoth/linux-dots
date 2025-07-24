import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DateTimePicker from "../components/DateTimePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { createNewExam, fetchExamsByQuizset } from "../api";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router";

const durationOptions = [
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "1h", value: 60 },
];

export default function ExamCreationDialog({ quizsetId, quizsetTitle }) {
  const [examState, setExamState] = useState({
    creatorParticipationAllowed: false,
    startTime: new Date(),
    duration: 30,
  });
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const navigate = useNavigate();

  const [duration, setDuration] = useState(0);

  // Fetch existing exams for this quizset
  useEffect(() => {
    const fetchExams = async () => {
      if (quizsetId && session?.user?.id) {
        setLoading(true);
        try {
          const examData = await fetchExamsByQuizset(
            quizsetId,
            session.user.id
          );
          setExams(examData);
        } catch (error) {
          console.error("Error fetching exams:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExams();
  }, [quizsetId, session?.user?.id]);
  const examStateHandlers = {
    toggleCreatorParticipation: () => {
      setExamState({
        ...examState,
        creatorParticipationAllowed: !examState.creatorParticipationAllowed,
      });
    },
    changeStartTime: (date) => {
      setExamState({
        ...examState,
        startTime: date,
      });
    },
    changeDuration: (duration) => {
      setExamState({
        ...examState,
        duration: duration,
      });
    },
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button asChild variant={"outline"}>
          <div>Exam</div>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`font-inter font-[500] text-lg min-w-fit px-10 bg-white/70 backdrop-blur-sm rounded-2xl border-none outline-none
          `}
      >
        <DialogHeader>
          <DialogTitle className={`text-3xl`}>{quizsetTitle}</DialogTitle>
          <DialogDescription className={`text-lg`}>
            {"Create an exam from this quizset or view existing exams"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-10 ">
          {/* Existing Exams Section */}
          {exams.length > 0 && (
            <div className="flex flex-col gap-y-2 items-start">
              <span className="text-xl font-[600]">Existing Exams</span>
              <div className="grid grid-cols-1 gap-2 w-full">
                {exams.map((exam) => (
                  <Button
                    key={exam.id}
                    variant="outline"
                    className="w-full text-left flex justify-between items-center p-6 hover:bg-accent cursor-pointer"
                    onClick={() => navigate(`/x/${exam.id}`)}
                  >
                    <div className="flex flex-col ">
                      <span className="font-medium">{exam.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(exam.start_time).toLocaleString()} ·{" "}
                        {exam.duration_minutes} min
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
              <Separator className="my-4" />
            </div>
          )}

          {/* Loading state */}
          {loading && <div className="text-center py-2">Loading exams...</div>}
          <div className="flex flex-col gap-y-2 items-start">
            <span className="text-xl font-[600]">Preferences</span>
            <div
              className="flex flex-col border rounded-2xl p-4 hover:bg-accent cursor-default bg-white"
              onClick={() => {
                examStateHandlers.toggleCreatorParticipation();
              }}
            >
              <div className="flex items-center gap-x-2 ">
                <Checkbox checked={examState.creatorParticipationAllowed} />
                <Label className="text-xl font-[600]">
                  Join as a Participant.
                </Label>
              </div>
              <Separator className={"my-2"} />
              <span className="w-[400px] font-[400] text-sm text-muted-foreground">
                {" "}
                If checked, you'll take the exam like other participants. If
                unchecked, you'll be able to monitor the exam live instead.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 items-start">
            <span className="text-xl font-[600]">Schedule Your Exam</span>
            <div className="flex flex-col">
              <DateTimePicker
                examState={examState}
                examStateHandlers={examStateHandlers}
              />
              <span className="text-sm my-2 font-[500]">Duration</span>
              <div className="flex mb-2 gap-x-2 flex-wrap">
                {durationOptions.map((option, i) => (
                  <Button
                    variant={"outline"}
                    key={option.value}
                    onClick={() => {
                      examStateHandlers.changeDuration(option.value);
                      setDuration(i);
                    }}
                    className={`${
                      i === duration
                        ? "text-white bg-muted-foreground hover:bg-muted-foreground hover:text-white border-none rounded-xl"
                        : ""
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button asChild variant="secondary">
              <div>Cancel</div>
            </Button>{" "}
          </DialogClose>

          <DialogClose>
            <Button asChild variant={"default"}>
              <div
                onClick={async () => {
                  try {
                    const result = await createNewExam({
                      title: quizsetTitle,
                      creatorId: session.user.id,
                      creatorParticipationAllowed:
                        examState.creatorParticipationAllowed,
                      startTime: examState.startTime,
                      duration: examState.duration,
                      quizSetId: quizsetId,
                      isPublic: false,
                      shuffleQuestions: true,
                    });

                    if (result?.success && result?.data?.id) {
                      // Navigate to the newly created exam
                      navigate(`/x/${result.data.id}`);
                    }
                  } catch (error) {
                    console.error("Error creating exam:", error);
                  }
                }}
              >
                Create
              </div>
            </Button>{" "}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
