import { generateMultipleChoiceQuestion } from "../../utils/ai";

export async function POST(req: Request) {
  const { knowledge, instuctions, quantity, questionType } = await req.json();
  const questions = await generateMultipleChoiceQuestion(
    quantity,
    knowledge,
    instuctions,
    questionType
  );
  return new Response(JSON.stringify(questions), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
