import {
  generateQuestionsController,
  getQuestionsController,
} from "./controllers/quizController.js";

export function runRouter(app) {
  app.post("/api/generate-q", generateQuestionsController);
  app.get("/api/q/:quizsetId", getQuestionsController);
}
