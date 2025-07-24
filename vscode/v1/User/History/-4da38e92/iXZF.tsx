import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

type FormType = {
  email: string;
  password: string;
};

function FormComp({}: Props) {
  const { register } = useForm<FormType>();
  return (
    <div>
      <form>
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormComp;
