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
import SonnerWrapper from "./wrappers/SonnerWrapper";
import Page404 from "./app/404";
import Exam from "./app/ExamContainer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SonnerWrapper>
      <SessionProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/not-found" element={<Page404 />} />
            <Route path="x/:examId" element={<Exam />} />
            <Route
              path="/"
              element={
                <AuthWrapper>
                  <App />
                </AuthWrapper>
              }
            >
              <Route index element={<QuizGenerationFront />} />
              <Route path="q/:quizsetId" element={<Quizset />} />
            </Route>
          </Routes>
        </Router>
      </SessionProvider>
    </SonnerWrapper>
  </StrictMode>
);
