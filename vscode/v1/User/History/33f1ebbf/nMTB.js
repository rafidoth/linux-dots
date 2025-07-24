import { tool } from "ai";
import { getProblemById } from "../../data/coding_problems/index.js";
import { z } from "zod";
import {
  Code,
  ProblemConversationRecords,
} from "../codingProblemsController.js";

export const tools = {
  getProblemStatementById: tool({
    description: "Get problem statement by problem id",
    parameters: z.object({
      problemId: z.string().describe("problem id of the coding problem"),
    }),

    execute: ({ problemId }) => {
      console.log("called getProblemStatementById");
      const description = getProblemById(problemId).description;
      const result = `Don't give much more information than the problem statement it self. You can Rephrase this problem statement. Keep it concise and undestandable for candidate. Before the problem statement write this : So, here is a problem statement for you :   ${description} after the problem statement ask something like "Feel free to ask any clarifying question.
          `;
      console.log(result);
      return result;
    },
  }),

  getProblemExamplesById: tool({
    description: "Get examples for a problem by problem id",
    parameters: z.object({
      problemId: z.string().describe("problem id of the coding problem"),
    }),
    execute: ({ problemId }) => {
      const examples = getProblemById(problemId).examples;
      const fewShotExamples = getProblemById(problemId).examplesFewShot;
      let result = `You can rephrase and ask candidate to guess the answer for this example like a normal human interviewer message. But keep it concise and undestandable for candidate. if candidate can't guess the answer correctly then explain the example to him and make sure he/she understand the examples. Otherwise call this function again to get another example. If candidate answer in short phrase tell him/her to explain why its the answer he/she thinks `;
      if (ProblemConversationRecords.exampleGiven < examples.length) {
        const example = examples[ProblemConversationRecords.exampleGiven];
        ProblemConversationRecords.exampleGiven++;
        result += example;
      } else {
        result =
          `You can make another example like this given one. But keep it concise and undestandable for candidate ${examples[0]}   ` +
          result;
      }

      return result + `Few shot examples : ${JSON.stringify(fewShotExamples)}`;
    },
  }),

  getProblemConstraintsById: tool({
    description: "Get constraints for a problem by problem id",
    parameters: z.object({
      problemId: z.string().describe("problem id of the coding problem"),
    }),
    execute: ({ problemId }) => {
      const constraints = JSON.stringify(getProblemById(problemId).constraints);
      return `You can rephrase these constraints like a normal human interviewer message. But keep it concise and undestandable for candidate. ${constraints}`;
    },
  }),

  getProblemHintById: tool({
    description: "Get hints for a problem by problem id",
    parameters: z.object({
      problemId: z.string().describe("problem id of the coding problem"),
    }),
    execute: ({ problemId }) => {
      return `take a single hint from this list which wasn't discussed before and also start from basic to advanced one. While picking hint make sure to take the best one for candidate's current understanding. Rephrase that but don't reveal solution at all. The message should be concise and understandable. ${JSON.stringify(
        getProblemById(problemId).hints
      )}`;
    },
  }),

  getProblemSolutionsById: tool({
    description: "Get solutions for a problem by problem id",
    parameters: z.object({
      problemId: z.string().describe("problem id of the coding problem"),
    }),
    execute: ({ problemId }) => {
      return `take a solution step by step which wasn't discussed and also start from basic solution to more advanced one.  ${JSON.stringify(
        getProblemById(problemId).solutions
      )}`;
    },
  }),

  EvaluateCandidateApproach: tool({
    description: "Evaluate candidate's problem solving approach",
    parameters: z.object({
      problemId: z.string().describe("problem id of the coding problem"),
    }),
    execute: ({ problemId }) => {
      console.log("its used");
      const approaches = getProblemById(problemId).solving_approaches;
      const fewShotExamples =
        getProblemById(problemId).fewShotExamplesSolvingApproaches;

      return `
        Identify if candidate is on the right track or not. Don't reveal solution at all. But you can guide candidate if he/she is not on the right track.
        --------------
        Behavior guidelines:
        - messages should not contain multiple questions, one question at a time.
        - don't reveal any keyword related to solution at all 
        - only provide hint when candidate asks for it
        - make it concies and understandable
        These are the solving_approaches.  ${JSON.stringify(
          approaches
        )} Few shot examples : ${JSON.stringify(fewShotExamples)}`;
    },
  }),

  getCodesWrittenByCandidate: tool({
    description:
      "This function will let you see what candidate written in the editor",
    parameters: z.object({}),
    execute: () => {
      console.log("Code.current running...", Code);
      const prompt = `
        Candidate's code is provided in the shared codepad below:
        ${
          Code.current === Code.previous
            ? Code.current
            : `
          Previously, the candidate wrote:
          ${Code.previous}

          The candidate has now updated their code to:
          ${Code.current}`
        }

        ** If candidate written any code, first ask him to explain what he's trying to do. **
        ** If candidate added any new code, find the difference he's trying to make. **
        ** Analyze the code puresly by reading it.**
        ** Find any mistake or error or issue in the code then ask candidate "can you explain what are you doing in this line of your code?" **
        ** If Candidate Update the code then ask for explaining the thought process"

        `;
      return prompt;
    },
  }),
};
