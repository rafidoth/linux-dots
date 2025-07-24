import { db_init } from "../supabase/db";

export async function removeQuestion(question_uuid: string) {
  console.log(question_uuid);
  await removeAnswers(question_uuid);
  console.log("answers removed");
  await removeChoices(question_uuid);
  console.log("choices removed");

  const db = await db_init();
  const { error } = await db.from("questions").delete().eq("id", question_uuid);
  if (error) {
    console.error("question delete error", error);
    throw new Error("Error deleting question");
  }
  console.log("question deleted");
}

async function removeAnswers(question_uuid: string) {
  const db = await db_init();

  const { error } = await db
    .from("answers")
    .delete()
    .eq("questionID", question_uuid);
  if (error) {
    console.error("answers delete error", error);
    throw new Error("Error deleting answers");
  }
}

async function removeChoices(question_uuid: string) {
  const db = await db_init();

  const { error } = await db
    .from("choices")
    .delete()
    .eq("questionID", question_uuid);
  if (error) {
    console.error("choices delete error", error);
    throw new Error("Error deleting choices");
  }
}
