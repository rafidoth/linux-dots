import { useNavigate } from "react-router";
import supabase from "../supabase";

function AuthWrapper({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("session", session);
      console.log("event ", event);
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
