import { generateQuestionsController } from "./controllers/quizController";

export function Router(app) {
  app.get("/api/generate-q", generateQuestionsController);
}
