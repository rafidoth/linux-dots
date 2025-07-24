import { auth } from "@clerk/nextjs/server";
import CreatorView from "../../components/CreatorView";
import ParticipantView from "../../components/ParticipantView";
import { get_quizset_creator } from "@/app/supabase/dbRead";
import { useEffect } from "react";

type Props = { params: Promise<{ qid: string }> };

async function Exam({ params }: Props) {
  const { userId, redirectToSignIn } = await auth();
  const [test, setTest] = React.useState<TestRowType | null>(null);
  const qid = (await params).qid;
  useEffect(() => {}, []);
  if (!userId) {
    redirectToSignIn({ returnBackUrl: `/t/${qid}` });
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
