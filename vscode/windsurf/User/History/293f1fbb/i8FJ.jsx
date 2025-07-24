import { useState } from "react";

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
        className={`font-inter font-[500] text-lg min-w-fit px-10 bg-white/70 backdrop-blur-sm rounded-2xl border-none outline-none
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
                onClick={() => {
                  console.log(examState);
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
