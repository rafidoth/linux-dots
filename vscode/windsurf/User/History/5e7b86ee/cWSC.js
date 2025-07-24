import { createClient } from "@supabase/supabase-js";
export function getSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
}

export async function signInWithGoogle() {
  const { data, error } = await getSupabaseClient().auth.signInWithOAuth({
    provider: "google",
  });
}
