import { Button } from "@/components/ui/button";
import { useSession } from "../context/SessionContext";

function LoginPage() {
  const session = useSession();
  return (
    <>
      <div>
        <Button onClick={session.signInWithGoogle}>Sign In</Button>
      </div>
    </>
  );
}

export default LoginPage;
