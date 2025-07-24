import { getSupabaseClient } from "../supabase";

export async function signInWithGoogle() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  console.log(data, error);
  if (error) {
    throw error;
  }

  return data;
}
