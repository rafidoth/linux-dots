import { Outlet } from "react-router";
import "./App.css";
import Sidebar from "./app/Sidebar";

function App() {
  return (
    <div className="h-[100vh] flex">
      <Sidebar />
      <main className="h-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
