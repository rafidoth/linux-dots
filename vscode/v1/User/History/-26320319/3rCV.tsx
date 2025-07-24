"use client";
import React from "react";
import InputSection from "@/app/components/InputSection";
import GeneratedQuizView from "@/app/components/GeneratedQuizView";
import { QuestionTypeType, QuizType } from "@/app/utils/types";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
type Props = {
  gen: boolean;
  fetchedQuizSet: QuizType[];
  content: string;
  setContent: (content: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  questionType: QuestionTypeType;
  setQuestionType: (questionType: QuestionTypeType) => void;
  generate: () => void;
};

function ResizablePanelGen({
  gen,
  fetchedQuizSet,
  content,
  setContent,
  quantity,
  setQuantity,
  questionType,
  setQuestionType,
  generate,
}: Props) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={55} minSize={30}>
        <GeneratedQuizView
          quantity={quantity}
          setQuantity={setQuantity}
          questionType={questionType}
          setQuestionType={setQuestionType}
          generating={gen}
          fetchedQuizes={fetchedQuizSet}
          generate={generate}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel minSize={30}>
            <InputSection content={content} setContent={setContent} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={30}>
            <div className="p-10">AI Assistant ⚡</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default ResizablePanelGen;
