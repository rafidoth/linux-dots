import React from "react";
import { SignupFormStudent } from "@/app/(student)/ui/SignupFormStudent";
const page = () => {
  return (
    <div className="w-[1200] flex flex-col gap-y-12 my-10">
      <div className="flex flex-col">
        <span className="text-5xl font-semibold">Student</span>
        <span className="text-muted-foreground text-xl">
          Create your account as a student.{" "}
        </span>
      </div>
      <SignupFormStudent />
    </div>
  );
};

export default page;
