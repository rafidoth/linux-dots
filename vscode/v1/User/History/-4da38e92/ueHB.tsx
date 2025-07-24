import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

function FormComp({}: Props) {
  const { register } = useForm();
  return <div>FormComp</div>;
}

export default FormComp;
