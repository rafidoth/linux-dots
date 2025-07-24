import { generateQuestions } from "../services/interactionWithLLM.js";

export async function generateQuestionsController(req, res) {
  const { knowledge, instructions, quantity, questionType } = req.body;
  console.log("knowledge", knowledge);
  console.log("quantity", quantity);
  const response = await generateQuestions(
    quantity,
    knowledge,
    instructions,
    questionType
  );

  const quizzes = response.object;

  // storing mcq questions in dob
  breakGeneratedMcqQuestionsIntoParts(quizzes);

  res.status(200).json(questions);
}
