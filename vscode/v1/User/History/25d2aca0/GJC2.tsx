import React from "react";

type Props = { params: Promise<{ quizsetID: string }> };

const page = ({ params }: Props) => {
  const profileID = (await params).profileID;
  return <div>page</div>;
};

export default page;
