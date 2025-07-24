import React from "react";
import { SignupFormStudent } from "@/app/ui/SignupFormStudent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/app/ui/LoginForm";
const page = () => {
  return (
    <div className="flex min-h-svh justify-center  p-6 md:p-10">
      <Tabs defaultValue="student" className="w-fit">
        <TabsList className="w-[400px] border-none">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="mentor">Mentor</TabsTrigger>
        </TabsList>
        <TabsContent value="student" className="">
          <span className="text-3xl font-semibold bg-orange-800/20">
            Create Student Account
          </span>
        </TabsContent>
        <TabsContent value="mentor">
          <span className="text-3xl font-semibold">Create Mentor Account</span>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
