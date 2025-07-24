import { generateQuestionsController } from "./controllers/quizController.js";

export function runRouter(app) {
  app.post("/api/generate-q", generateQuestionsController);
}
