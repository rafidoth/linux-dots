import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";

function AuthWrapper({ children }) {
  const { loading, isAuthenticated } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.log("No authenticated session found, redirecting to login");
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // Show nothing while checking authentication
  if (loading) return <div>Checking Auth ....</div>;

  // If we get here and we're not authenticated, the redirect will happen
  // For authenticated users, render the children
  return children;
}

export default AuthWrapper;
