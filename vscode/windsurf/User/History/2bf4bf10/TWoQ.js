import {
  createNewExam,
  getExamsByQuizsetController,
  getParticipationStatus,
} from "./controllers/examControllers.js";
import {
  generateQuestionsController,
  getQuestionsController,
} from "./controllers/quizController.js";
import {
  getUserQuizsetsController,
  updateQuizsetTitleController,
} from "./controllers/quizsetControllers.js";

export function runRouter(app) {
  app.post("/api/generate-q", generateQuestionsController);
  app.get("/api/q/:quizsetId", getQuestionsController);
  app.get("/api/q/:quizsetId/exams", getExamsByQuizsetController);
  app.patch("/api/q/:quizsetId/update-title", updateQuizsetTitleController);
  app.post("/api/exam", createNewExam);
  app.post("/api/exam/participant-status", getParticipationStatus);
  app.get("/api/user/quizsets", getUserQuizsetsController);
}
