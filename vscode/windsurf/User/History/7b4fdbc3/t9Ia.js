import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
import supabase from "../supabase";

function AuthWrapper({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session", session);
      setSession(session);
    });

    if (!session) return navigate("/login");
    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  if (loading) return null;
  return children;
}

export default AuthWrapper;
