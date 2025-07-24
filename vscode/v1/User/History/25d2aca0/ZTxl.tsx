import React from "react";

type Props = { params: Promise<{ quizsetID: string }> };

const page = async ({ params }: Props) => {
  const pID = (await params).profileID;
  return <div>page</div>;
};

export default page;
