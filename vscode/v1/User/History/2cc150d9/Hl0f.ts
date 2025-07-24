import { db_init } from "../supabase/db";

export async function updateQuizsetTitle(quizsetID: string, t: string) {
  const db = await db_init();
  const { error } = await db
    .from("quizsets")
    .update({ title: t })
    .eq("id", quizsetID);

  if (error) {
    console.error("quizset update error", error);
    throw new Error(
      "Error updating quizset title : returned error from update command"
    );
  }
}
