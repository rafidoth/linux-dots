import React from "react";
import { SignupFormStudent } from "@/app/ui/SignupFormStudent";
const page = () => {
  return (
    <div className="w-[1200] flex flex-col">
      <div className="flex flex-col gap-y-5">
        <h1>Student</h1>
        <p>Create your account as a student. </p>
      </div>
      <SignupFormStudent />
    </div>
  );
};

export default page;
