import Profile from "@/app/ui/Profile";
import React from "react";
import { InterestType } from "@/app/types";
import { GetStudentInterests } from "../(student)/actions/actions";
type Props = { params: Promise<{ student_id: string }> };

const page = async ({ params }: Props) => {
  const pID = (await params).student_id;
  console.log(pID);
  const fetchedInterests: InterestType[] = await GetStudentInterests();
  const data = {
    interests: fetchedInterests,
  };
  return (
    <div>
      <Profile student data={data} />
    </div>
  );
};

export default page;
