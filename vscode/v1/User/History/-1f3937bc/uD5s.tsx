import React from "react";
import { SignupFormStudent } from "@/app/ui/SignupFormStudent";
const page = () => {
  return (
    <div className="w-[1200] flex flex-col">
      <div className="flex flex-col gap-y-5">
        <p className="text-4xl font-semibold">Student</p>
        <p>Create your account as a student. </p>
      </div>
      <SignupFormStudent />
    </div>
  );
};

export default page;
