import { Button } from "@/components/ui/button";
import { useSession } from "../context/SessionContext";

function LoginPage() {
  const session = useSession();
  return (
    <>
      <div className="flex gap-x-2">
        <Button onClick={session.signInWithGoogle}>Sign In</Button>
        <Button onClick={session.signOut}>Sign Out</Button>
      </div>
    </>
  );
}

export default LoginPage;
