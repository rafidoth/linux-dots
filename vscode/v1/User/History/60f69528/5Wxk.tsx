"use client";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useCurrentQuizsetCtx } from "../contexts/CurrentQuizset.context";

interface LargeTextInputFieldProps {}
const placeholder_longText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
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
        placeholder={`Type or Paste (ctrl+V) Text. \n\n ${placeholder_longText}`}
        value={currentQuizset.context.content}
        className={cn(
          "w-full h-[800px] bg-transparent text-xl outline-none ",
          "border-none p-5 scrollbar",
          "appearance-none resize-none placeholder-gray-400/50 placeholder:italic",
          "overflow-auto "
        )}
      ></textarea>
    </>
  );
}
