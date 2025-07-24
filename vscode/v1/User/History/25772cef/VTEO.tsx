import { auth } from "@clerk/nextjs/server";
import CreatorView from "../../components/CreatorView";
import ParticipantView from "../../components/ParticipantView";
import { get_quizset_creator } from "@/app/supabase/dbRead";

type Props = { params: Promise<{ tid: string }> };

async function Exam({ params }: Props) {
  const { userId, redirectToSignIn } = await auth();
  const tid = (await params).tid;
  if (!userId) {
    redirectToSignIn({ returnBackUrl: `/t/${tid}` });
  } else {
    const creator_of_test = await get_quizset_creator();
    if (creator_of_test === userId) {
      return <CreatorView />;
    } else {
      return <ParticipantView qid={qid} />;
    }
  }
  return;
}

export default Exam;
