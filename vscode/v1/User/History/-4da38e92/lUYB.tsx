import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

type FormType = {
  email: string;
  password: string;
};

function FormComp({}: Props) {
  const { register, handleSubmit } = useForm<FormType>();

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-6 w-[500px]"
      >
        <input {...register("email")} type="text" placeholder="Email" />
        <input
          {...register("password")}
          type="password"
          placeholder="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormComp;
