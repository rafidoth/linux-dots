import {
  generateQuestionsController,
  generateTitleForContextController,
} from "./controllers/quizController.js";

export function runRouter(app) {
  app.post("/api/generate-q", generateQuestionsController);
  app.post("/api/generate-title", generateTitleForContextController);
}
