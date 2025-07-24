import { generateQuestionsController } from "./controllers/quizController";

export function Router(app) {
  app.post("/api/generate-q", generateQuestionsController);
}
