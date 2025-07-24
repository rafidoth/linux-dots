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
  const { Quizsets } = useQuizSetCtx();
  const today = new Date();
  const todayDate: number = Number(
    today.toISOString().split("T")[0].split("-")[2]
  );
  const todaysQuizsets = Quizsets.filter((quizset) => {
    const d = convertDate(quizset.created_at);
    return Number(d.date) === todayDate;
  });
  return (
    <div className="p-6 ">
      <div className="my-10 ">
        <span className="text-5xl font-semibold">Today</span>
        <div className="flex flex-wrap gap-4 py-2 overflow-auto">
          {todaysQuizsets.map((quizset) => {
            const d = convertDate(quizset.created_at);
            return (
              <div
                key={quizset.id}
                className="flex flex-col w-[400px] h-[200px] gap-2 bg-accent p-4 rounded-xl"
              >
                <h1 className="font-semibold text-2xl">{quizset.title}</h1>
                <div className="flex justify-start w-full gap-4 ">
                  <span>{d.time}</span>

                  <span>
                    {d.date} {d.month}, {d.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <span className="text-5xl font-semibold my-6 ">History</span>
      <div className="flex flex-wrap gap-4 py-2 h-[500px] overflow-auto">
        {Quizsets.map((quizset) => {
          const d = convertDate(quizset.created_at);
          if (Number(d.date) === todayDate) return null;
          return (
            <div
              key={quizset.id}
              className="flex flex-col w-[400px] h-[200px] gap-2 bg-accent p-4 rounded-xl"
            >
              <h1 className="font-semibold text-xl">{quizset.title}</h1>
              <div className="flex justify-start w-full gap-4">
                <span>{d.time}</span>

                <span>
                  {d.date} {d.month}, {d.year}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
