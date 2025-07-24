import { useCurrentUserCtx } from "@/app/contexts/CurrentUserContext";
import { get_Total_Question_Count } from "@/app/utils/dbRead";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [totalQuestionCount, setTotalQuestionCount] = useState<number>(0);
  // current user context needed
  const { currentUser } = useCurrentUserCtx();

  useEffect(() => {
    const fetchTotalQuestionCount = async () => {
      const count: number = await get_Total_Question_Count("user_id");
    };
  }, []);
  return (
    <div>
      <h1>{totalQuestionCount}</h1>
    </div>
  );
}
