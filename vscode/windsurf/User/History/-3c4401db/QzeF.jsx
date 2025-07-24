import { signInWithGoogle } from "../auth/auth";

function LoginPage() {
  return (
    <>
      <div>
        <Button onClick={signInWithGoogle}>Sign In</Button>
      </div>
    </>
  );
}

export default LoginPage;
