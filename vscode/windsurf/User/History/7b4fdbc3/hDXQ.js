import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { getSupabaseClient } from "../auth/auth";

function AuthWrapper({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

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

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Still checking existing session – render nothing or a loader
  if (loading) return null;

  // Not logged in – redirect to login page
  if (!session) return <Navigate to="/login" replace />;

  // Authenticated – render nested routes or provided children
  return children;
}

export default AuthWrapper;
