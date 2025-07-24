import React, { useState } from "react";

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
};

const EditableField = ({ value, onChange, className = "" }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleBlur = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
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
        {value}
      </span>
    );
  }
};

export default EditableField;
