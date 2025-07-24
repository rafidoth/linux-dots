"use client";
import { useState } from "react";
import { MagicWandIcon, TextIcon } from "@radix-ui/react-icons";
import { BiSolidFilePdf } from "react-icons/bi";
import { GrMultiple } from "react-icons/gr";
import { QuizType } from "@/app/utils/types";
import ResizablePanelGen from "@/app/components/ResizablePanelGen";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const services = [
  {
    title: "General Prompt",
    description: `Enter a general topic and let our AI generate a quiz for you. It's quick and easy!`,
    icon: <TextIcon width={64} height={64} />,
  },
  {
    title: "Text",
    description: `Provide your content in text format and let our AI create quizzes for you.`,
    icon: <TextIcon width={64} height={64} />,
  },
  {
    title: "PDF",
    description: `Upload a PDF file and our AI will generate quizzes based on its content.`,
    icon: <BiSolidFilePdf className="w-[64px] h-[64px]" />,
  },
  {
    title: "PPTX",
    description: `Upload a PowerPoint file and our AI will generate quizzes based on its content.`,
    icon: <MagicWandIcon width={64} height={64} />,
  },
  {
    title: "Mixed Content",
    description: `Combine multiple formats and let our AI generate quizzes from them.`,
    icon: <GrMultiple className="w-[64px] h-[64px]" />,
  },
];

export default function CreatePage() {
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

  const options = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className={`w-full h-full p-10 gap-4 flex flex-wrap`}>
      {services.map((service) => {
        return (
          <Card
            key={service.title}
            className="w-[400px] h-[250px] flex flex-col justify-between bg-transparent hover:border-2 cursor-pointer"
          >
            <CardHeader className="font-semibold text-3xl">
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex ">{service.icon}</CardContent>
          </Card>
        );
      })}
    </div>
  );
}
