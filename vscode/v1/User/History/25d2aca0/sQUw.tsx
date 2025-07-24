import React from "react";

type Props = { params: Promise<{ quizsetID: string }> };

const page = ({ params }: Props) => {
  const profileID = params.profileID;
  return <div>page</div>;
};

export default page;
