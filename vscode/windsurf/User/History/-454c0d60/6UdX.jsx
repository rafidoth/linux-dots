import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, BrowserRouter as Router } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route></Route>
      </Routes>
    </Router>
    <App />
  </StrictMode>
);
