import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";

function AuthWrapper({ children }) {
  const { loading, isAuthenticated } = useSession();
  const navigate = useNavigate();
  if (!loading && !isAuthenticated) {
    navigate("/login");
  }
  if (loading) return <div>Checking Auth ....</div>;
  return children;
}

export default AuthWrapper;
