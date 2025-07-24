import { auth } from "@clerk/nextjs/server";
import CreatorView from "../../components/CreatorView";
import ParticipantView from "../../components/ParticipantView";
import { get_quizset_creator, getTestFromDB } from "@/app/supabase/dbRead";
import { TestRowType } from "@/app/utils/types";

type Props = { params: Promise<{ tid: string }> };

async function Exam({ params }: Props) {
  const { userId, redirectToSignIn } = await auth();
  const tid = (await params).tid;
  if (!userId) {
    redirectToSignIn({ returnBackUrl: `/t/${tid}` });
  } else {
    const test: TestRowType = await getTestFromDB(tid);
    console.log(test);
    const creator_of_test = await get_quizset_creator(test.quizsetID);
    if (creator_of_test === userId) {
      return <CreatorView />;
    } else {
      return <ParticipantView qid={test.quizsetID} />;
    }
  }
  return;
}

export default Exam;
