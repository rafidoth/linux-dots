import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { btn_style } from "@/app/config.jigao";
import { useCurrentQuizsetCtx } from "@/app/contexts/CurrentQuizset.context";
import { GiFireBowl } from "react-icons/gi";
import { cn } from "@/lib/utils";
import TimeSelection from "../../TimeSelection";
import DateSelection from "../../DateSelection";
import { TestInsertType } from "@/app/utils/types";
import { insertTest } from "@/app/supabase/db";

const generateTimeOptions = (start = 5, end = 180, step = 15) => {
  return Array.from({ length: Math.ceil((end - start) / step) + 1 }, (_, i) => {
    const minutes = start + i * step;
    if (minutes > end) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const label = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

    return { label: label, value: minutes };
  }).filter(Boolean);
};

const combineDateAndTime = (date: Date, hour: number, minute: number) => {
  date.setHours(hour, minute);
  return date.toISOString();
};
const calculateEndTime = (isoString, durationMinutes) => {
  const date = new Date(isoString); // Parse ISO string
  date.setMinutes(date.getMinutes() + durationMinutes);
  return date.toISOString();
};

function CreateExamBtn() {
  const { currentQuizset } = useCurrentQuizsetCtx();
  const [hour, setHour] = React.useState<number>(7);
  const [minute, setMinute] = React.useState<number>(30);
  const [date, setDate] = React.useState<Date>(new Date());
  const [duration, setDuration] = React.useState<number>(0);
  const [timerType, setTimerType] = React.useState<"global" | "individual">(
    "global"
  );

  console.log(duration);
  const handleCreateExam = () => {
    console.log("Creating exam");
    const test: TestInsertType = {
      quizsetID: currentQuizset.quizset.id,
      creatorID: currentQuizset.quizset.userId,
      start_time: combineDateAndTime(date, hour, minute),
      duration_minutes: duration,
      timer_type: timerType,
      end_time: calculateEndTime(
        combineDateAndTime(date, hour, minute),
        duration
      ),
      per_question_value: 1,
    };

    await insertTest(test);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className={`${btn_style} flex gap-x-2`}>
          <GiFireBowl /> Create Exam
        </div>
      </DialogTrigger>
      <DialogContent className=" p-8 bg-zinc-950 text-xl outline-none">
        <DialogTitle>{currentQuizset.quizset.title}</DialogTitle>
        <span className="font-semibold">Start Time</span>
        <div className="flex flex-col gap-2">
          <DateSelection date={date} setDate={setDate} />
          <TimeSelection
            hour={hour}
            minute={minute}
            setHour={(h: number) => setHour(h)}
            setMinute={(m: number) => setMinute(m)}
          />
        </div>
        <span className="font-semibold">Duration</span>
        <div>
          <Select onValueChange={(e) => setDuration(parseInt(e))}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              {generateTimeOptions().map(
                (option) =>
                  option && (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  )
              )}
            </SelectContent>
          </Select>
        </div>

        <span className="font-semibold">Timer Type</span>
        <RadioGroup
          defaultValue={timerType}
          onValueChange={(str: string) =>
            setTimerType(str as "global" | "individual")
          }
          className="flex"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="global" id="option-one" />
            <Label htmlFor="global">Global</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="option-two" />
            <Label htmlFor="individual">Individual</Label>
          </div>
        </RadioGroup>

        <div className="w-full flex justify-end">
          <DialogClose>
            <div
              onClick={() => handleCreateExam()}
              className={cn(btn_style, "w-[200px] select-none")}
            >
              Create Exam
            </div>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateExamBtn;
