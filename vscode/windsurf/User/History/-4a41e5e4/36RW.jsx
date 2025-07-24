import { Outlet } from "react-router";
import "./App.css";
import Sidebar from "./app/Sidebar";

function App() {
  return (
    <div className="h-[100vh]">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
