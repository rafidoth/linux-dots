import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { MockLanguageModelV1 } from "ai/test";

const model = google("gemini-2.0-flash-001");
const test_model = new MockLanguageModelV1();

export function generateQuestions(
  n: number,
  context: string,
  instructions: string,
  questionType: string
) {
  let questionTypePrompt = "";
  if (questionType === "multiple-choice") {
    questionTypePrompt = "multiple choice questions with 4 options only.";
  }
  const result = generateObject({
    model: model,
    output: "array",
    schema: z.object({
      question: z.string(),
      choices: z.array(z.string()),
      answer: z.number(),
      answerExplanation: z.string(),
    }),
    prompt: `Generate ${n} ${questionType} based 
    on the given context. Each question should have only 4 options
    and also follow the instructions given
    <instructions>
    ${instructions}}
    </instructions>
    <context>${context} </context>
    `,
  });
  return result;
}
