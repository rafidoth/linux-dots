import type { User } from "@jigao/types/User";

function App() {
  const user: User = {
    name: "helloworld",
    age: 23,
  };
  console.log(user);

  return <>Hello world</>;
}

export default App;
