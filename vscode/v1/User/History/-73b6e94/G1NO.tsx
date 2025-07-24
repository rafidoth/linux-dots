import { getQuizzes, SingleQuizInTest } from "@/app/utils/dbTest";
import React, { useEffect, useState } from "react";

type Props = {
  qid: string;
};

function ParticipantView({ qid }: Props) {
  const [quizzes, setQuizzes] = useState<SingleQuizInTest[]>([]);

  useEffect(() => {
    const fun = async () => {
      const qzs: SingleQuizInTest[] | null = await getQuizzes(qid);
      if (qzs) {
        setQuizzes(qzs);
      } else {
        throw new Error("Error fetching questions in test");
      }
    };
    fun();
  }, []);
  return <div>ParticipantView</div>;
}

export default ParticipantView;
