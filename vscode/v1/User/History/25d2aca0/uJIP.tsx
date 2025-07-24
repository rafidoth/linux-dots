import React from "react";

type Props = { params: Promise<{ student_id: string }> };

const page = async ({ params }: Props) => {
  const pID = (await params).student_id;
  return <div>{pID}</div>;
};

export default page;
