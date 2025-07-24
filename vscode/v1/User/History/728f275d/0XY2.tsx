import React, { useState } from "react";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  placeholder: string;
  pass?: boolean;
};

const EditableField = ({
  placeholder,
  value,
  onChange,
  className = "",
  pass,
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
        className={className}
        autoFocus
      />
    );
  } else {
    return (
      <span
        onClick={() => setIsEditing(true)}
        className={`${className} cursor-pointer`}
      >
        {value.length ? value : placeholder}
      </span>
    );
  }
};

export default EditableField;
