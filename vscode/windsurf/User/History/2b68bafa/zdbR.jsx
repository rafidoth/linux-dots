import { useState } from "react";
import { fetchQuizset, generateQuestions } from "../api";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import QuizCard from "./QuizCard";
import { Button } from "@/components/ui/button";
import SelectList from "@/src/components/SelectList";
import DialogBox from "../components/DialogBox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSession } from "../context/SessionContext";
import { useEffect } from "react";
import { useParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { Calendar } from "@/components/ui/calendar";
import DateTimePicker from "../components/DateTimePicker";
import { CalendarDays } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

function Quizset() {
  const quizsetId = useParams().quizsetId;
  const [quizsetTitle, setQuizsetTitle] = useState("Untitled");
  // console.log("from params ", quizsetId);
  const [generationSettings, setGenerationSettings] = useState({
    questionType: "multiple-choice",
    questionCount: 20,
    instruction: "",
    context: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [contextFieldOpen, setContextFieldOpen] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const session = useSession();
  // console.log(session.user);

  const changeInstruction = (e) => {
    setGenerationSettings({
      ...generationSettings,
      instruction: e.target.value,
    });
  };

  const changeContext = (context) => {
    setGenerationSettings({
      ...generationSettings,
      context: context,
    });
  };

  const changeQuestionType = (e) => {
    setGenerationSettings({
      ...generationSettings,
      questionType: e.target.value,
    });
  };

  const changeQuestionCount = (num) => {
    const value = parseInt(num);
    if (!isNaN(value)) {
      setGenerationSettings({
        ...generationSettings,
        questionCount: value,
      });
    }
  };

  const handleGenerate = async () => {
    if (!generationSettings.context.trim()) {
      // TODO: Show toast
      return;
    }

    if (generationSettings.context.trim().length > 10) {
      setIsGenerating(true);
      if (session?.user) {
        const response = await generateQuestions({
          userId: session.user.id,
          quantity: generationSettings.questionCount,
          knowledge: generationSettings.context,
          instructions: generationSettings.instruction,
          questionType: generationSettings.questionType,
        });
        console.log("response ", response);
        setQuizzes(response);
      } else {
        // TODO: Show toast and naviagate to login
      }
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (quizsetId) {
      const key = `quizset-${quizsetId}`;
      const cached = localStorage.getItem(key);

      const fetchQuizzes = async () => {
        try {
          const response = await fetchQuizset(quizsetId, session.user.id);
          setQuizzes(response.quizzes);
          changeContext(response.context);
          setQuizsetTitle(response.quizsetTitle);
          localStorage.setItem(key, JSON.stringify(response));
        } catch (error) {
          console.error("Error fetching quizzes:", error);
        }
      };
      if (cached) {
        const parsed = JSON.parse(cached);
        // console.log("cached ", parsed);
        setQuizzes(parsed.quizzes);
        changeContext(parsed.context);
        setQuizsetTitle(parsed.quizsetTitle);
      } else {
        fetchQuizzes();
      }
    }
  }, [quizsetId]);

  return (
    <div className="h-full w-full flex  space-y-6">
      <div
        className={`${
          contextFieldOpen ? "w-1/2" : "w-full"
        } h-full transition-all duration-500 p-6`}
      >
        <div>
          <div className="flex items-center gap-2">
            <ExamBtn quizsetId={quizsetId} quizsetTitle={quizsetTitle} />

            {isGenerating ? (
              <Button variant={"outline"} className={"cursor-not-allowed"}>
                <div>Generating...</div>
              </Button>
            ) : (
              <DialogBox
                title="Generate More"
                description="Tweak the settings to create questions just the way you like."
                onClose={{
                  title: "Generate More",
                  action: handleGenerate,
                }}
              >
                <div className="flex flex-col gap-y-2">
                  <SelectList
                    value={generationSettings.questionType}
                    onValueChange={(value) => changeQuestionType(value)}
                    label="Question Type"
                    itemsList={[
                      { value: "multiple-choice", label: "Multiple Choice" },
                    ]}
                  />
                  <SelectList
                    value={generationSettings.questionCount}
                    onValueChange={(value) => changeQuestionCount(value)}
                    label="Choose how many questions to create"
                    itemsList={Array.from({ length: 40 }, (_, i) => {
                      if (i % 5 === 4 && i >= 9) {
                        return {
                          value: i + 1,
                          label: i + 1,
                        };
                      }
                    }).filter((item) => item !== undefined)}
                  />
                  <div className="flex flex-col gap-y-2">
                    <Label>Instruction</Label>
                    <Textarea
                      value={generationSettings.instruction}
                      onChange={(e) => changeInstruction(e)}
                      className={"h-[150px]"}
                      placeholder={
                        "example : make 50% questions harder and 50% questions easier"
                      }
                    ></Textarea>
                  </div>
                </div>
              </DialogBox>
            )}
          </div>
          <div className="max-h-[calc(100vh-70px)] overflow-y-auto p-5">
            <div className="flex flex-wrap gap-4 justify-between pb-10">
              {quizzes.length > 0 &&
                quizzes.map((quiz, index) => (
                  <QuizCard
                    key={index}
                    quiz={quiz}
                    index={index}
                    contextFieldOpen={contextFieldOpen}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          contextFieldOpen ? "w-1/2" : "w-[60px]"
        } h-full border-l-1 border-l-black relative transition-all duration-500`}
      >
        <span
          className="hover:bg-black transition-all duration-300 bg-neutral-500  absolute -left-4 top-30 bg rounded-full"
          onClick={() => {
            setContextFieldOpen(!contextFieldOpen);
          }}
        >
          {contextFieldOpen ? (
            <ChevronRight size={32} color="white" className="" />
          ) : (
            <ChevronLeft size={32} color="white" className="" />
          )}
        </span>
        <div
          className={`w-full h-full ${
            contextFieldOpen ? "" : "whitespace-nowrap "
          }`}
        >
          <Button asChild variant={"outline"} className={"py-5 my-5 mx-5"}>
            <Label className={`text-3xl font-bold`}>{quizsetTitle}</Label>
          </Button>
          <textarea
            value={generationSettings.context}
            onChange={(e) => changeContext(e.target.value)}
            placeholder="Enter your text context here..."
            className={`w-full h-full p-4 border-0 outline-0 focus:bg-accent`}
          />
        </div>
      </div>
    </div>
  );
}

export default Quizset;

const durationOptions = [
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "1h", value: 60 },
];

const ExamBtn = ({ quizsetId, quizsetTitle }) => {
  const [examState, setExamState] = useState({
    creatorParticipationAllowed: false,
    startTime: new Date(),
    duration: 30,
  });

  const [duration, setDuration] = useState(0);
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
        className={`font-inter font-[500] text-lg min-w-[calc(100vw-100px)] min-h-[calc(100vh-100px)] bg-white/70 backdrop-blur-sm rounded-2xl border border-white
          `}
      >
        <DialogHeader>
          <DialogTitle className={`text-3xl`}>{quizsetTitle}</DialogTitle>
          <DialogDescription className={`text-lg`}>
            {"Create an exam from this quizset"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-10 ">
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
                        ? "text-white bg-muted-foreground hover:bg-muted-foreground hover:text-white"
                        : ""
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            <DialogClose>
              <Button asChild variant={"default"}>
                <div onClick={() => {}}>Create</div>
              </Button>{" "}
            </DialogClose>
          </div>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button asChild variant="secondary">
              <div>Cancel</div>
            </Button>{" "}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
