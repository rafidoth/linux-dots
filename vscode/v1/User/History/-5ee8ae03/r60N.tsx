import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Signup from "./ui/SignupStudent";
const page = () => {
  return (
    <div className="flex min-h-svh justify-center  p-6 md:p-10">
      <Tabs defaultValue="student" className="w-fit">
        <TabsList className="w-[700px] ">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="mentor">Mentor</TabsTrigger>
        </TabsList>
        <TabsContent value="student" className=" py-10">
          <span className="text-4xl font-semibold bg-orange-800/20 px-2 text-orange-500 rounded-md">
            Create Student Account
          </span>
          <Signup />
        </TabsContent>
        <TabsContent value="mentor">
          <span className="text-3xl font-semibold bg-blue-800/20 px-2 text-blue-500 rounded-md">
            Create Mentor Account
          </span>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
