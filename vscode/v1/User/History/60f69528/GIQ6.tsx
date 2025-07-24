"use client";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface LargeTextInputFieldProps {
  text: string;
  setText: (text: string) => void;
}

export default function LargeTextInputField({
  text,
  setText,
}: LargeTextInputFieldProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <textarea
        ref={textAreaRef}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or Paste (ctrl+V) Text..."
        value={text}
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
