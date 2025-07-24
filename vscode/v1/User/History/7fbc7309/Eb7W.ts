import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { MockLanguageModelV1 } from "ai/test";

const model = google("gemini-2.0-flash-001");

export function generateMultipleChoiceQuestion(
  n: number,
  context: string,
  instructions: string
) {
  const result = generateObject({
    model: model,
    output: "array",
    schema: z.object({
      question: z.string(),
      choices: z.array(z.string()),
      answer: z.number(),
      answerExplanation: z.string(),
    }),
    prompt: `Generate ${n} multiple choice questions based 
    on the given context. Each question should have only 4 options
    and also follow the instructions given
    <context>${context} </context>
    <instructions>
    ${instructions}}
    </instructions>
    `,
  });
  return result;
}
