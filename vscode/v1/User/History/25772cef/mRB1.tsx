import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { get_quizset_creator } from "@/app/utils/dbRead";

type Props = { params: Promise<{ qid: string }> };

async function Exam({ params }: Props) {
  const user = currentUser();
  const qid = (await params).qid;
  if (!user) {
    redirect("/sign-in");
  } else {
    const creator_of_test = await get_quizset_creator(qid);
    if (creator_of_test === user.id) {
      return <CreatorView qid={qid} />;
    }
  }
  return;
}

export default Exam;
