import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import LoginPage from "./app/LoginPage";
import AuthWrapper from "./wrappers/AuthWrapper";
import { SessionProvider } from "./context/SessionContext";
import Quizset from "./app/Quizset";
import QuizGenerationFront from "./app/QuizGenerationFront";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <AuthWrapper>
                <App />
              </AuthWrapper>
            }
          >
            <Route index element={<QuizGenerationFront />} />
            <Route path="q/:quizsetId" element={<TextBasedQuizGeneration />} />
          </Route>
        </Routes>
      </Router>
    </SessionProvider>
  </StrictMode>
);
