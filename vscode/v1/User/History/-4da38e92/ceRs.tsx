import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

type FormType = {
  email: string;
  password: string;
};

function FormComp({}: Props) {
  const { register } = useForm<FormType>();
  return <div>FormComp</div>;
}

export default FormComp;
