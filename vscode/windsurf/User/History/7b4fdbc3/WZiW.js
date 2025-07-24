import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
import { getSupabaseClient } from "../supabase";

function AuthWrapper({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const supabase = getSupabaseClient();
    const getSession = async () => {
      setLoading(true);
      const {
        data: { s },
      } = await supabase.auth.getSession();
      setSession(s);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    if (!session) return navigate("/login");
    console.log("session", session);
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) return null;
  return children;
}

export default AuthWrapper;
