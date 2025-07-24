import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

type FormType = {
  email: string;
  password: string;
};

function FormComp({}: Props) {
  return (
    <div>
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormComp;
