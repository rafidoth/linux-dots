"use client";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
interface EditableTitleProps {
  initialTitle: string;
  onSave?: (newTitle: string) => void;
  className?: string;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const EditableTitle = ({
  initialTitle,
  onSave,
  className,
  isEditing,
}: EditableTitleProps) => {
  const [title, setTitle] = useState(initialTitle);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (title.trim() !== initialTitle) {
      onSave?.(title);
      alert("Title updated successfully");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      setTitle(initialTitle);
      setIsEditing(false);
    }
  };
  return (
    <div>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full bg-transparent border-none outline-none px-3 py-2",
            "text-4xl font-semibold tracking-tight",
            "ring ring-white/10 rounded-sm",
            "transition-all duration-200 ease-in-out",
            className
          )}
          aria-label="Edit title"
        />
      ) : (
        <span
          className={cn(
            "py-2 rounded-lg",
            "transition-all duration-200 ease-in-out",
            "hover:text-white/90",
            "flex items-center",
            className
          )}
        >
          {title}
        </span>
      )}
    </div>
  );
};
export default EditableTitle;
