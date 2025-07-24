import React from "react";
import InputSection from "@/app/components/InputSection";
import GeneratedQuizView from "@/app/components/GeneratedQuizView";
import { QuizType } from "@/app/utils/types";
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
};

function ResizablePanelGen({
  gen,
  fetchedQuizSet,
  content,
  setContent,
}: Props) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={55} minSize={30}>
        <GeneratedQuizView generating={gen} fetchedQuizes={fetchedQuizSet} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel minSize={30}>
            <InputSection content={content} setContent={setContent} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={30}>
            <div className="p-10">Options</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default ResizablePanelGen;
