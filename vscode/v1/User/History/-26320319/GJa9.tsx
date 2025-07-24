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
  qid: string;
};

function ResizablePanelGen({ qid }: Props) {
  const [generating, setGenerating] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const { currentQuizset, setCurrentQuizset } = useCurrentQuizsetCtx();
  const [quantity, setQuantity] = useState<number>(0);
  const [questionType, setQuestionType] = useState<QuestionTypeType>("mcq");

  const { isLoaded, user } = useUser();
  const { currentQuizset, setCurrentQuizset } = useCurrentQuizsetCtx();
  const { setQuizsets } = useQuizSetCtx();
  const quizsetID = qID;
  const handleGenerate = async () => {
    if (currentQuizset.context.content.length === 0) {
      console.log("No content");
      return;
    }
    if (quantity === 0) {
      console.log("No quiz count");
      return;
    }
    console.log("Generating quiz");
    const data = {
      knowledge: currentQuizset.context.content,
      instructions: "",
      quantity: quantity,
      questionType: questionType,
    };

    setGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const { object }: { object: MCQ_AI_ResponseType[] } =
        await response.json();
      if (isLoaded && user) {
        let set: QuizsetType;
        if (currentQuizset.questions.length === 0) {
          set = await saveMCQtoDB(
            object,
            questionType,
            currentQuizset.context.content,
            user.id
          );
        } else {
          set = await saveMCQtoDB(
            object,
            questionType,
            currentQuizset.context.content,
            user.id,
            currentQuizset.quizset.id
          );
        }
        const fetchCurrentQuizsetFromDB: QuizSet_Type = await get_MCQ_quizset(
          set.id
        );
        setCurrentQuizset(fetchCurrentQuizsetFromDB);

        // for maintaining the quizset history
        const fetchedQuizsets: QuizsetType[] = await fetchQuizSetsOfUserFromDB(
          user.id
        );
        setQuizsets(fetchedQuizsets);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (!quizsetID) return;
    if (quizsetID === "new") {
      setCurrentQuizset(initialValue);
    } else {
      const fn = async () => {
        setGenerating(true);
        const current_quizset: QuizSet_Type = await get_MCQ_quizset(quizsetID);
        if (current_quizset) {
          setCurrentQuizset(current_quizset);
        }
        return setGenerating(false);
      };
      fn();
    }
  }, []);
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={30}>
        <GeneratedQuizView
          quantity={quantity}
          setQuantity={setQuantity}
          questionType={questionType}
          setQuestionType={setQuestionType}
          generating={generating}
          generate={handleGenerate}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={20} minSize={20}>
        <InputSection />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default ResizablePanelGen;
