import { useState, useEffect } from "react";
import supabase from "../supabase";

const SessionContext = createContext(null);
export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getInitialSession() {
      try {
        setLoading(true);
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();

        console.log("Initial session:", initialSession);
        setSession(initialSession);
        setUser(initialSession?.user || null);
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        setLoading(false);
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log("Auth event:", event);
      console.log("Current session:", currentSession);

      setSession(currentSession);
      setUser(currentSession?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(data, error);
    if (error) {
      throw error;
    }

    return data;
  };

  const value = {
    session,
    user,
    loading,
    signOut,
    signInWithGoogle,
    isAuthenticated: !!session,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

// useSession hook has been moved to './useSession.js'
