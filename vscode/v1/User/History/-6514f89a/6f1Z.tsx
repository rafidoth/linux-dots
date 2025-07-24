import ResizablePanelGen from "../../../components/ResizablePanelGen";
import React from "react";

type Props = { params: Promise<{ qid: string }> };
async function QuizsetPage({ params }: Props) {
  const qid = (await params).qid;
  return (
    <>
      <ResizablePanelGen qid={qid} />
    </>
  );
}

export default QuizsetPage;
