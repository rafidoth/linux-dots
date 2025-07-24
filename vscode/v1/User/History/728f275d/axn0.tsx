import React, { useState } from "react";

type Props = {};

const EditableField = (props: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return <div>EditableField</div>;
};

export default EditableField;
