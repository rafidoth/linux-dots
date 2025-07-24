"use client"
import ResizablePanelGen from "@/app/components/ResizablePanelGen";
import { useState } from "react";
import { QuizType } from "@/app/utils/types";

type Props = {

};
const dummyQuizzes: QuizType[] = [
  {
    question: "What is the capital of France?",
    answer: 2,
    answerExplanation: "Paris is the capital of France.",
    choices: ["Berlin", "Madrid", "Paris", "Rome"]
  },
  {
    question: "What is 2 + 2?",
    answer: 1,
    answerExplanation: "2 + 2 equals 4.",
    choices: ["3", "4", "5", "6"]
  },
  {
    question: "What is the largest planet in our solar system?",
    answer: 3,
    answerExplanation: "Jupiter is the largest planet in our solar system.",
    choices: ["Earth", "Mars", "Saturn", "Jupiter"]
  }
]


function TextPromptPage({}: Props) {
  const [content, setContent] = useState<string>("");
  const [fetchedQuizes, setFetchedQuizes] = useState<QuizType[]>([]);
  const [quizCount, setQuizCount] = useState<number>(0);
  const [generating, setGenerating] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (content.length === 0) {
      console.log("No content");
      return;
    }
    if (quizCount === 0) {
      console.log("No quiz count");
      return;
    }
    console.log("Generating quiz");
    const data = {
      knowledge: content,
      instructions: "",
      quantity: quizCount,
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
      const { object } = await response.json();
      setFetchedQuizes(object);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setGenerating(false);
    }
  };
  return <ResizablePanelGen 
        gen={generating}  
        fetchedQuizSet={fetchedQuizes}
        content={content} 
        setContent={setContent}
    />;
}

export default TextPromptPage;
