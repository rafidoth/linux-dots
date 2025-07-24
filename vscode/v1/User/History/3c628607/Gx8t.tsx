import React from "react";
import { mentorleveltype } from "../types";

type Props = {
  mentorList: {
    mentorId: string;
    name: string;
    organization: string;
    profile_pic: string;
    level: mentorleveltype;
  };
};

const FindMentorStudentInterest = (props: Props) => {
  return <div>FindMentorStudentInterest</div>;
};

export default FindMentorStudentInterest;
