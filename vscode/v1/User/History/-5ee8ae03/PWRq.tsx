import React from "react";
import { SignupFormStudent } from "@/app/ui/SignupFormStudent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/app/ui/LoginForm";
const page = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-[400px] flex justify-center">
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="w-full">
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
    </div>
  );
};

export default page;
