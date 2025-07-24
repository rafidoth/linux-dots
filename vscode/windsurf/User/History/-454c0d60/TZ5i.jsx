import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="gen" />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
