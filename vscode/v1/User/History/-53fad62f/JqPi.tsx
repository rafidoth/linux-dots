import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-center select-none">
      <span
        onClick={() => {
          redirect("/sign-in");
        }}
      >
        sign in
      </span>
      <span>sign up</span>
    </div>
  );
}
