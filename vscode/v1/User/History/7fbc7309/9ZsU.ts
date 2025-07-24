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
  switch (questionType) {
    case "multiple-choice":
      return generateMultipleChoiceQuestion(n, context, instructions);
    case "true-false":
      return generateTrueFalse(n, context, instructions);
    case "fill-in-the-blanks":
      return generateFillInTheBlanks(n, context, instructions);
    case "short-answer":
      return generateShortAnswer(n, context, instructions);
    default:
      return generateMultipleChoiceQuestion(n, context, instructions);
  }
}

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
    <instructions>
    ${instructions}}
    </instructions>
    <context>${context} </context>
    `,
  });
  return result;
}

export function generateTrueFalse(
  n: number,
  context: string,
  instructions: string
) {
  const result = generateObject({
    model: model,
    output: "array",
    schema: z.object({
      question: z.string(),
      answer: z.boolean(),
      answerExplanation: z.string(),
    }),
    prompt: `Generate ${n} true/false questions based 
    on the given context. Each question should be answerable with true or false
    and also follow the instructions given
    <instructions>
    ${instructions}}
    </instructions>
    <context>${context} </context>
    `,
  });
  return result;
}

export function generateFillInTheBlanks(
  n: number,
  context: string,
  instructions: string
) {
  const result = generateObject({
    model: model,
    output: "array",
    schema: z.object({
      question: z.string(),
      answer: z.string(),
      answerExplanation: z.string(),
    }),
    prompt: `Generate ${n} fill-in-the-blanks questions based 
    on the given context. Each question should have a blank space to be filled
    and also follow the instructions given
    <instructions>
    ${instructions}}
    </instructions>
    <context>${context} </context>
    `,
  });
  return result;
}

export function generateShortAnswer(
  n: number,
  context: string,
  instructions: string
) {
  const result = generateObject({
    model: model,
    output: "array",
    schema: z.object({
      question: z.string(),
      answer: z.string(),
      answerExplanation: z.string(),
    }),
    prompt: `Generate ${n} short answer questions based 
    on the given context. Each question should be answerable in a few sentences
    and also follow the instructions given
    <instructions>
    ${instructions}}
    </instructions>
    <context>${context} </context>
    `,
  });
  return result;
}
