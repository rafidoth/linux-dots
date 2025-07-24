import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import QuizGenerationPage from "./app/QuizGenerationPage";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Rotate3D } from "lucide-react";
import LoginPage from "./app/LoginPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<App />}>
          <Route index element={<QuizGenerationPage />} />
          <Route path="gen" element={<QuizGenerationPage />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
