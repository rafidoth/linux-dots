import { generateQuestionsController } from "./controllers/quizController";

export function runRouter(app) {
  app.post("/api/generate-q", generateQuestionsController);
}
