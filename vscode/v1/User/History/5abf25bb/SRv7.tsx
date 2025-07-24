"use client";
import { useQuizSetCtx } from "@/app/contexts/Quizset.context";

const convertDate = (date: string) => {
  const d = new Date(date);
  const ret = {
    day: d.toLocaleDateString("en-US", { weekday: "long" }),
    date: d.toISOString().split("T")[0].split("-")[2],
    month: d.toLocaleDateString("en-US", { month: "long" }),
    year: d.toISOString().split("T")[0].split("-")[0],
    time: d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
  return ret;
};

export default function MyQuizzes() {
  const { Quizsets, setQuizsets } = useQuizSetCtx();
  const today = new Date();
  const todayDate: number = Number(
    today.toISOString().split("T")[0].split("-")[2]
  );
  const todaysQuizsets = Quizsets.filter((quizset) => {
    const d = convertDate(quizset.created_at);
    return Number(d.date) === todayDate;
  });
  return (
    <div className="p-6">
      {Quizsets.map((quizset) => {
        const d = convertDate(quizset.created_at);
        return (
          <div key={quizset.id}>
            <h1>{quizset.title}</h1>

            <span>
              {d.date} {d.month}, {d.year}
            </span>
            <span> {d.time}</span>
          </div>
        );
      })}
    </div>
  );
}
