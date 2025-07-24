import Profile from "@/app/ui/Profile";
import React from "react";

type Props = { params: Promise<{ student_id: string }> };

const page = async ({ params }: Props) => {
  const pID = (await params).student_id;
  return (
    <div>
      <Profile student />
    </div>
  );
};

export default page;
