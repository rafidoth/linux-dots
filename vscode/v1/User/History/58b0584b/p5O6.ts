import { generateMultipleChoiceQuestion } from "../../utils/ai";

export async function POST(req: Request) {
  const { knowledge, instuctions, quantity } = await req.json();
  const questions = await generateMultipleChoiceQuestion(
    quantity,
    knowledge,
    instuctions
  );
  return new Response(JSON.stringify(questions), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
