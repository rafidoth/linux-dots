import ResizablePanelGen from "../../../components/ResizablePanelGen";
import React from "react";

type Props = { params: Promise<{ quizsetID: string }> };
async function QuizsetPage({ params }: Props) {
  const qid = (await params).quizsetID;
  return (
    <>
      <ResizablePanelGen quizsetID={qid} />
    </>
  );
}

export default QuizsetPage;
