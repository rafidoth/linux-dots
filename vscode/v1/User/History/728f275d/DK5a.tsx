import React, { useState } from "react";

type Props = {};

const EditableField = (props: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  if (isEditing) {
    return <input></input>;
  } else {
    return <div></div>;
  }
};

export default EditableField;
