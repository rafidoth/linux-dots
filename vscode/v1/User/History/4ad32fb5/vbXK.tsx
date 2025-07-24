import React from "react";
import { SignupFormStudent } from "@/app/ui/SignupFormStudent";
const page = () => {
  return (
    <div className="w-[1200] flex flex-col gap-y-12 my-10 items-center">
      <div className="flex flex-col">
        <span className="text-5xl font-semibold">Student</span>
        <span className="text-muted-foreground text-xl">
          Create your account as a student.{" "}
        </span>
      </div>
      <div>
        <SignupFormStudent />
      </div>
    </div>
  );
};

export default page;
