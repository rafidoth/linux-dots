"use client";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useCurrentQuizsetCtx } from "../contexts/CurrentQuizset.context";

interface LargeTextInputFieldProps {}

export default function LargeTextInputField({}: LargeTextInputFieldProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>("");
  const { currentQuizset, setCurrentQuizset } = useCurrentQuizsetCtx();

  return (
    <>
      <textarea
        ref={textAreaRef}
        onChange={(e) =>
          setCurrentQuizset({
            ...currentQuizset,
            context: { ...currentQuizset.context, content: e.target.value },
          })
        }
        placeholder="Type or Paste (ctrl+V) Text..."
        value={currentQuizset.context.content}
        className={cn(
          "w-full h-full bg-transparent text-xl outline-none ",
          "border-none p-5 scrollbar",
          "appearance-none resize-none placeholder-gray-400/50 placeholder:italic",
          "overflow-auto "
        )}
      ></textarea>
    </>
  );
}
