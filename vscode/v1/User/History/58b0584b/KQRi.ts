import { generateMultipleChoiceQuestion } from "../../utils/ai";

export async function POST(req: Request) {
  const { knowledge, instuctions, quantity, type } = await req.json();
  return new Response(JSON.stringify(questions), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
