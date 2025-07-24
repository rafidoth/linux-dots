import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [totalQuestionCount, setTotalQuestionCount] = useState<number>(0);
  useEffect(() => {}, []);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
