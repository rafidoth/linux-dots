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
    <div className="w-full h-screen flex justify-center items-center">
      <form className=" flex flex-col gap-6 w-[500px]">
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormComp;
