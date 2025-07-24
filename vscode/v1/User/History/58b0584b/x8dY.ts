import {
  generateMultipleChoiceQuestion,
  generateFillInTheBlanks,
  generateShortAnswer,
  generateTrueFalse,
} from "../../utils/ai";

export async function POST(req: Request) {
  const { knowledge, instuctions, quantity, questionType } = await req.json();
  let generatedQuestions;
  switch (questionType) {
    case "multipleChoice":
      generatedQuestions = await generateMultipleChoiceQuestion(
        quantity,
        knowledge,
        instuctions
      );
      break;
    case "trueFalse":
      generatedQuestions = await generateTrueFalse(
        quantity,
        knowledge,
        instuctions
      );
      break;
    case "fillInTheBlanks":
      generatedQuestions = await generateFillInTheBlanks(
        quantity,
        knowledge,
        instuctions
      );
      break;
    case "shortAnswer":
      generatedQuestions = await generateShortAnswer(
        quantity,
        knowledge,
        instuctions
      );
      break;
    default:
      throw new Error("Invalid question type");
  }

  return new Response(JSON.stringify(questions), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
