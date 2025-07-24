import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

type Props = { params: Promise<{ qid: string }> };

async function Exam({ params }: Props) {
  const user = currentUser();
  const qid = (await params).qid;
  if (!user) {
    redirect("/sign-in");
  } else {
    const creator_of_test =  
  }
  return;
}

export default Exam;
