import { generateQuestions } from "../services/interactionWithLLM.js";

export async function generateQuestionsController(req, res) {
  const { knowledge, instructions, quantity, questionType } = req.body;
  const response = await generateQuestions(
    quantity,
    knowledge,
    instructions,
    questionType
  );

  const quizzes = response.object;

  res.status(200).json(quizzes);
}
