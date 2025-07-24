import React from "react";
import { SignupFormStudent } from "@/app/ui/SignupFormStudent";
const page = () => {
  return (
    <div className="w-[1200] flex flex-col gap-y-12">
      <div className="flex flex-col">
        <span className="text-4xl font-semibold">Student</span>
        <span>Create your account as a student. </span>
      </div>
      <SignupFormStudent />
    </div>
  );
};

export default page;
