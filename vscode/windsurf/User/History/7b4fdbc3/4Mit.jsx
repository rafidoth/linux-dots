import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";

function AuthWrapper({ children }) {
  const { loading, isAuthenticated } = useSession();
  console.log("authl ", isAuthenticated, loading);
  const navigate = useNavigate();

  if (!loading && !isAuthenticated) {
    console.log("No authenticated session found, redirecting to login");
    navigate("/login");
  }

  // Show nothing while checking authentication
  if (loading) return <div>Checking Auth ....</div>;

  // If we get here and we're not authenticated, the redirect will happen
  // For authenticated users, render the children
  return children;
}

export default AuthWrapper;
