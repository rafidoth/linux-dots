"use client";
import { useState } from "react";
import { MagicWandIcon, TextIcon } from "@radix-ui/react-icons";
import { BiSolidFilePdf } from "react-icons/bi";
import { BsFiletypePptx } from "react-icons/bs";
import { GrMultiple } from "react-icons/gr";
import { TbWorld } from "react-icons/tb";
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
import Link from "next/link";

const services = [
  {
    title: "General Prompt",
    description: `Enter a general topic and let our AI generate a quiz for you. It's quick and easy!`,
    icon: <TbWorld className="w-[64px] h-[64px]" />,
    route: "/dashboard/quizset/general",
  },
  {
    title: "Text",
    description: `Provide your content in text format and let our AI create quizzes for you.`,
    icon: <TextIcon width={64} height={64} />,
    route: "/dashboard/quizset/text",
  },
  {
    title: "PDF",
    description: `Upload a PDF file and our AI will generate quizzes based on its content.`,
    icon: <BiSolidFilePdf className="w-[64px] h-[64px]" />,
    route: "/dashboard/quizset/pdf",
  },
  {
    title: "PPTX",
    description: `Upload a PowerPoint file and our AI will generate quizzes based on its content.`,
    icon: <BsFiletypePptx className="w-[64px] h-[64px]" />,
    route: "/dashboard/quizset/pptx",
  },
  {
    title: "Mixed Content",
    description: `Combine multiple formats and let our AI generate quizzes from them.`,
    icon: <GrMultiple className="w-[64px] h-[64px]" />,
    route: "/dashboard/quizset/mixed",
  },
];

export default function CreatePage() {
  const options = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className={`w-full h-full p-10 gap-4 flex flex-wrap`}>
      {services.map((service) => {
        return (
          <Link href={service.route} key={service.title}>
            <Card
              className={`w-[400px] h-[250px] flex  flex-col justify-between bg-transparent hover:scale-[95%] transition delay-75 duration-300 ease-in-out hover:border-white/50  cursor-pointer`}
            >
              <CardHeader className="font-semibold text-3xl">
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex">{service.icon}</CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
