import { generateQuestions } from "../services/interactionWithLLM.js";

export async function generateQuestionsController(req, res) {
  const { userId, knowledge, instructions, quantity, questionType } = req.body;
  console.log("user id ", userId);
  console.log("knowledge", knowledge);
  console.log("quantity", quantity);

  // check if the user is valid
  // check all fields are valid

  const response = await generateQuestions(
    quantity,
    knowledge,
    instructions,
    questionType
  );

  const quizzes = response.object;

  res.status(200).json(quizzes);
}
