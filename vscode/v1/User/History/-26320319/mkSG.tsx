"use client";
import React, { useState } from "react";
import InputSection from "@/app/components/InputSection";
import GeneratedQuizView from "@/app/components/GeneratedQuizView";
import { QuestionTypeType, QuizType } from "@/app/utils/types";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useCurrentQuizsetCtx } from "../contexts/CurrentQuizset.context";
type Props = {
  gen: boolean;
  quantity: number;
  setQuantity: (quantity: number) => void;
  questionType: QuestionTypeType;
  setQuestionType: (questionType: QuestionTypeType) => void;
  generate: () => void;
};

function ResizablePanelGen({
  gen,
  quantity,
  setQuantity,
  questionType,
  setQuestionType,
  generate,
}: Props) {
  const [content, setContent] = useState<string>("");
  const { currentQuizset, setCurrentQuizset } = useCurrentQuizsetCtx();
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={55} minSize={30}>
        <GeneratedQuizView
          quantity={quantity}
          setQuantity={setQuantity}
          questionType={questionType}
          setQuestionType={setQuestionType}
          generating={gen}
          generate={generate}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={20}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel minSize={30}>
            <InputSection />
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
