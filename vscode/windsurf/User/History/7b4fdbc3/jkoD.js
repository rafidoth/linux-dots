import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getSupabaseClient } from "../auth/auth";
import { AuthSession } from "@supabase/supabase-js";

/**
 * AuthWrapper protects routes that require an authenticated Supabase user.
 *
 * Usage with React-Router v6:
 *   <Route element={<AuthWrapper />}>
 *     <Route path="/protected" element={<ProtectedPage />} />
 *   </Route>
 *
 * If you prefer to wrap arbitrary JSX (not route tree), simply pass children:
 *   <AuthWrapper>
 *     <SomeComponent />
 *   </AuthWrapper>
 */
function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseClient();
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Still checking existing session – render nothing or a loader
  if (initialising) return null;

  // Not logged in – redirect to login page
  if (!user) return <Navigate to="/login" replace />;

  // Authenticated – render nested routes or provided children
  return children ? <>{children}</> : <Outlet />;
}

export default AuthWrapper;
