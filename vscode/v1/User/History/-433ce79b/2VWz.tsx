"use client";
import { useCurrentUserCtx } from "@/app/contexts/CurrentUserContext";
import { get_Total_Question_Count } from "@/app/utils/dbRead";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [totalQuestionCount, setTotalQuestionCount] = useState<number>(0);
  // current user context needed
  const { currentUser } = useCurrentUserCtx();

  useEffect(() => {
    const fetchTotalQuestionCount = async () => {
      if (currentUser.user_id) {
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
    <div>
      <h1>{totalQuestionCount}</h1>
    </div>
  );
}
