import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase";

// Create context
const SessionContext = createContext(null);

/**
 * SessionProvider component that manages Supabase authentication state
 * and provides it to the application through context
 */
export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the initial session
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

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log("Auth event:", event);
      console.log("Current session:", currentSession);

      setSession(currentSession);
      setUser(currentSession?.user || null);
    });

    // Cleanup subscription
    return () => subscription?.unsubscribe();
  }, []);

  // Authentication methods
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    session,
    user,
    loading,
    signOut,
    isAuthenticated: !!session,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

/**
 * Custom hook for accessing session data and auth methods
 * @returns {Object} Session data and auth methods
 */
export function useSession() {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
