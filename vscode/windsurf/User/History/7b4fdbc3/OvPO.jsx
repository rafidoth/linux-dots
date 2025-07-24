import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";

function AuthWrapper({ children }) {
  const { loading, isAuthenticated } = useSession();
  const navigate = useNavigate();

  // Redirect to login if not authenticated (after loading completes)
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.log("No authenticated session found, redirecting to login");
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // Show nothing while checking authentication
  if (loading) return null;

  // If we get here and we're not authenticated, the redirect will happen
  // For authenticated users, render the children
  return children;
}

export default AuthWrapper;
