import Profile from "@/app/ui/Profile";
import React from "react";

type Props = { params: Promise<{ student_id: string }> };

const page = async ({ params }: Props) => {
  const pID = (await params).student_id;
  React.useEffect(() => {
    console.log(pID);
  }, []);
  return (
    <div>
      <Profile student StudentProfileData={} />
    </div>
  );
};

export default page;
