import React from "react";
import { SignupFormStudent } from "@/app/ui/SignupFormStudent";
const page = () => {
  return (
    <div className="w-[1200] flex justify-center">
      <h1>Student</h1>
      <p>Create your account as a student. </p>
      <SignupFormStudent />
    </div>
  );
};

export default page;
