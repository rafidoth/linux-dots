import { generateQuestions } from "../services/interactionWithLLM.js";
import { createNewQuizSet, saveMcqQuizzesDB } from "../services/supabase.js";

export async function generateQuestionsController(req, res) {
  const { userId, knowledge, instructions, quantity, questionType } = req.body;
  console.log("user id ", userId);
  console.log("knowledge", knowledge);
  console.log("quantity", quantity);

  // check if the user is valid
  // check all fields are valid

  // const response = await generateQuestions(
  //   quantity,
  //   knowledge,
  //   instructions,
  //   questionType
  // );

  const quizzes = response.object;
  const quizset = await createNewQuizSet(quizzes[0].title, userId, "private");
  console.log(quizset);
  await saveMcqQuizzesDB(quizzes, quizset.id);

  res.status(200).json(quizzes);
}
