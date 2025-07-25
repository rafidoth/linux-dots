import { Edit } from "lucide-react";
import React, { useState } from "react";

type Props = {
  title?: string;
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  placeholder: string;
  pass?: boolean;
  editIcon?: boolean;
};

const EditableField = ({
  title,
  placeholder,
  value,
  onChange,
  className = "",
  pass,
  editIcon,
}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        type={pass ? "password" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} px-2 w-full outline-none`}
        autoFocus
      />
    );
  } else {
    return (
      <>
        {!pass && (
          <span
            onClick={() => setIsEditing(true)}
            className={`${className} cursor-pointer flex justify-between`}
          >
            <span className="flex">
              {value.length ? value : placeholder} {editIcon && <Edit />}
            </span>
            <span className="opacity-50">{title}</span>
          </span>
        )}
        {pass && (
          <span
            onClick={() => setIsEditing(true)}
            className={`${className} cursor-pointer flex justify-between`}
          >
            {value.length ? "*".repeat(value.length) : placeholder}
            <span className="opacity-50">{title}</span>
          </span>
        )}
      </>
    );
  }
};

export default EditableField;
