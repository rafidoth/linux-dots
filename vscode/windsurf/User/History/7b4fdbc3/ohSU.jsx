import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../supabase";

function AuthWrapper({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check the current session on mount
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession);
      setSession(currentSession);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth state change event:", event);
      console.log("New session:", newSession);
      setSession(newSession);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Only redirect after we've checked for an existing session
  useEffect(() => {
    if (!loading && !session) {
      console.log("No session found, redirecting to login");
      navigate("/login");
    }
  }, [session, loading, navigate]);

  if (loading) return null;
  return children;
}

export default AuthWrapper;
