import {
  createNewExam,
  getExamsByQuizsetController,
} from "./controllers/examControllers.js";
import {
  generateQuestionsController,
  getQuestionsController,
} from "./controllers/quizController.js";
import { getUserQuizsetsController } from "./controllers/quizsetControllers.js";

export function runRouter(app) {
  app.post("/api/generate-q", generateQuestionsController);
  app.get("/api/q/:quizsetId", getQuestionsController);
  app.get("/api/q/:quizsetId/exams", getExamsByQuizsetController);
  app.post("/api/exam", createNewExam);
  app.get("/api/user/quizsets", getUserQuizsetsController);
}
