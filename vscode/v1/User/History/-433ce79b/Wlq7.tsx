"use client";
import { useCurrentUserCtx } from "@/app/contexts/CurrentUserContext";
import { get_Total_Question_Count } from "@/app/utils/dbRead";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [totalQuestionCount, setTotalQuestionCount] = useState<number>(0);
  const { currentUser } = useCurrentUserCtx();
  console.log(currentUser);

  useEffect(() => {
    const fetchTotalQuestionCount = async () => {
      if (currentUser && currentUser.user_id) {
        console.log(currentUser.user_id);
        const totalQuestionCount = await get_Total_Question_Count(
          currentUser.user_id
        );
        setTotalQuestionCount(totalQuestionCount);
      }
    };
    fetchTotalQuestionCount();
  }, [currentUser]);

  return (
    <div className="p-8 w-full flex ">
      <div className="flex flex-col items-center justify-center space-y-4 w-[200px] h-[200px] border border-dashed">
        Generated total
        <AnimatedNumber
          className="inline-flex items-center font-mono text-2xl font-light text-zinc-800 dark:text-zinc-50"
          springOptions={{
            bounce: 10,
            duration: 3000,
          }}
          value={totalQuestionCount}
        />
        Questions
      </div>
    </div>
  );
}
