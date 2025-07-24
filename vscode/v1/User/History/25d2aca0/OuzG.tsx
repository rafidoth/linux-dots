import React from "react";

type Props = { params: Promise<{ studentID: string }> };

const page = async ({ params }: Props) => {
  const pID = (await params).profileID;
  return <div>page</div>;
};

export default page;
