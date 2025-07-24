import React from "react";
import { SignupFormStudent } from "@/app/ui/SignupFormStudent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/app/ui/LoginForm";
const page = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Tabs defaultValue="student" className="w-full">
        <TabsList className="w-[400px]">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="mentor">Mentor</TabsTrigger>
        </TabsList>
        <TabsContent value="student" className="border rounded-xl">
          <LoginForm student={true} />
        </TabsContent>
        <TabsContent value="mentor" className="border rounded-xl">
          <LoginForm student={false} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
