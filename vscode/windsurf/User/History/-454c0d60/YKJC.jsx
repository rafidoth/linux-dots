import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import QuizGenerationPage from "./app/QuizGenerationPage";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import LoginPage from "./app/LoginPage";
import AuthWrapper from "./wrappers/AuthWrapper";

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
            <Route index element={<QuizGenerationPage />} />
            <Route path="gen" element={<QuizGenerationPage />} />
          </Route>
        </Routes>
      </Router>
    </SessionProvider>
  </StrictMode>
);
