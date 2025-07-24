import { generateMultipleChoiceQuestion } from "../../utils/ai";

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
  }

  return new Response(JSON.stringify(questions), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
