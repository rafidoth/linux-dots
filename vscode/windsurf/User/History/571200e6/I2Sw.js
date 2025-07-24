import { getProblemById } from "../../data/coding_problems/index.js";
import globalMemory from "./memory.js";
import { getSolutionApproachDiscussionPrompt } from "./prompts.js";
import { sleep } from "./utils.js";
import {
  formatDeveloperMessage,
  formatOpenAIResponse,
  formatUserMessage,
  shortReplyAssistant,
} from "./openai_utils.js";

export const toolRouter = {
  getProblemStatementByProblemId: async ({ problemId }) => {
    console.log(
      "[Tool Call By LLM] getProblemStatementByProblemId with problemId ",
      problemId
    );

    const problem = getProblemById(problemId);
    if (!problem) {
      return "Problem not found";
    }
    if (globalMemory.socket) {
      let msg = "Great. Here I'm going to provide you the problem statement";
      globalMemory.socket.emit("candidate", msg);
      await sleep(1000);
      msg = problem.description;
      globalMemory.socket.emit("candidate", msg);
      await sleep(1000);
      msg = "Feel free to ask questions regarding this problem.";
      globalMemory.socket.emit("candidate", msg);
    } else {
      console.error("Socket not initialized");
    }

    globalMemory.currentCheckpoint.messages.push(
      formatDeveloperMessage(`
        The candidate has already received the following problem statement:
        ${problem.description}

        ----------------------------------
        In the upcoming responses, the candidate may fall into one of the following scenarios:

        1. Asks a clarifying question  
        - Respond clearly to address their confusion.  
        - Confirm their understanding after your response.

        2. Requests an example or hint  
        - Provide a relevant example and ask the candidate to predict the output.  
        - Clarify any follow-up questions and confirm understanding.

        3. Has no questions  
        - Politely ask the candidate to explain their understanding of the problem.

        Maintain a conversational tone. Do not give away the solution or lead them. Focus on clarity, engagement, and keeping the flow natural.
    `)
    );

    return {
      furtherCall: false,
      prompt: null,
    };
  },
  getExamplesByProblemId: async ({ problemId }) => {
    console.log(
      "[Tool Call By LLM] getExamplesByProblemId with problemId ",
      problemId
    );
    const problem = getProblemById(problemId);
    const examples = problem.examples;
    if (examples.length === 0) {
      return "No examples available for this problem";
    }
    const random = examples[Math.floor(Math.random() * examples.length)];

    globalMemory.currentCheckpoint.messages.push(
      formatDeveloperMessage(
        `
        Here is an example : ${random}

        Firstly, make this example into a conversational message.
        Secondly, ask the candidate to predict the output.

        for example : 
            Interviewer : "Here is an array with only even numbers [2, 4, 6, 8], you have to find out the numbers which are greater than 5. can you tell me the output?"

            Candidate : "yes sure, its [4, 6, 8]" 

            Interviewer : Can you explain why its [4, 6, 8]?
    `
      )
    );

    return {
      furtherCall: true,
    };
  },
  checkProblemUnderstandingCheckpoint: async ({}) => {
    globalMemory.currentCheckpoint.messages.push(
      formatDeveloperMessage(
        `The candidate has discussed the problem statement and examples. 
        Analyze the whole conversation and confirm these points:
            1. At least one example has been discussed and candidate has predicted the output correctly.
            2. Candidate could rephrase the problem in his own words. 
        Next response should be in one word, "Yes" or "No".
        `
      )
    );
    const response = await shortReplyAssistant(
      globalMemory.currentCheckpoint.messages
    );

    if (response === "Yes") {
      globalMemory.currentCheckpoint.checkpointStatus = true;
      console.log(
        "Problem Understanding checkpoint completed, Moving to solution approach discussion"
      );
      let msg =
        "Great, your understanding seems clear. Now, how would you go about solving this?";

      globalMemory.socket.emit("candidate", msg);
      globalMemory.currentCheckpoint.messages.push(formatOpenAIResponse(msg));
      msg = "What is the first thinking you have?";
      globalMemory.socket.emit("candidate", msg);
      globalMemory.currentCheckpoint.messages.push(formatOpenAIResponse(msg));

      globalMemory.currentCheckpoint.messages.push(
        formatDeveloperMessage(
          `The candidate has completed the "Problem Understanding" checkpoint. 

        Now, in the next reply generate a clear and concise summary of the full conversation up to this point. 
        This summary should capture:
          - The candidate's interpretation of the problem,
          - Any clarifying questions they asked,
          - Key details or hints provided by the interviewer,
          - Their planned approach (if discussed).

        This summary will be reused in the next checkpoint to ensure continuity and avoid repetition.

       Format the summary as a bullet list or short paragraph, making it easy for the interviewer to quickly review the candidate’s understanding so far.`
        )
      );

      // problem understanding summary
      const pu_summary = await shortReplyAssistant(
        globalMemory.currentCheckpoint.messages
      );
      console.log("[Problem Understanding Summary] ", pu_summary);
      globalMemory.currentCheckpoint.summary = pu_summary;
      // NEW Checkpoint
      globalMemory.currentCheckpoint = globalMemory.checkpointMemory[1];
      globalMemory.currentCheckpoint.messages.push(
        formatDeveloperMessage(
          getSolutionApproachDiscussionPrompt(
            pu_summary,
            globalMemory.problemId
          )
        )
      );
      console.log("[Checkpoint Changed] ", globalMemory.currentCheckpoint);

      return { furtherCall: false };
    } else {
      globalMemory.currentCheckpoint.checkpointStatus = false;
      console.log("Problem Understanding checkpoint not completed");
      globalMemory.currentCheckpoint.messages.push(
        formatDeveloperMessage(
          `
            The candidate can have something missing in understanding. 
                1. Let candidate guess another example 
                2. make sure candidate predicted the output correctly.
        `
        )
      );
      return { furtherCall: true };
    }
  },

  getCandidateProgressBasedInstruction: async ({}) => {
    if (
      globalMemory.currentCheckpoint.checkpointTitle ===
      "SolutionApproachDiscussion"
    ) {
      const NoOftriedApproaches =
        globalMemory.currentCheckpoint.triedApproaches.length;

      if (NoOftriedApproaches > 0) {
        const lastApproach =
          globalMemory.currentCheckpoint.triedApproaches[
            NoOftriedApproaches - 1
          ];

        let approachCompleted = false;
        let remainingTaskPrompt = "";

        if (Array.isArray(lastApproach.tasks)) {
          const counts = lastApproach.tasks.reduce(
            (acc, t) => {
              if (!t?.taskType) return acc;
              acc[t.taskType] = (acc[t.taskType] || 0) + 1;
              return acc;
            },
            {
              question: 0,
              coding: 0,
              timecomplexity: 0,
              spacecomplexity: 0,
            }
          );

          if (counts.question < 2) {
            remainingTaskPrompt = `
                  Ask a question about this approach from candidate's described solution.
                    - find a way to handle edge cases
                    - any logic handling

                  question asking tone should be like this : 
                    "how are you going to handle the logic of two even numbers in being consecutive?"
                `;
          } else if (counts.coding < 1) {
            remainingTaskPrompt = `
                  Ask a coding task about this approach from candidate's described solution.
                  Follow this step by step.
                    1 - find the main working part of the approach
                    2 - ask candidate to code it up

                  coding task tone should be like this : 
                    "So, can you write the code for this part you just described ?"
                `;
          } else if (counts.timecomplexity < 1) {
            remainingTaskPrompt = `
                  ask time complexity for this approach and examine that.
                  don't explain that rather ask candidate to explain why this time complexity.
                `;
          } else if (counts.spacecomplexity < 1) {
            remainingTaskPrompt = `
                  ask space complexity for this approach and examine that.
                  don't explain that rather ask candidate to explain why this time complexity.
                `;
          }

          approachCompleted =
            counts.question >= 2 &&
            counts.coding >= 1 &&
            counts.timecomplexity >= 1 &&
            counts.spacecomplexity >= 1;
          console.log("[Approach completed?] ", approachCompleted);
        }

        if (!approachCompleted) {
          const prompt = `  
              candidate is discussing ${lastApproach.approachType} approach
              To response the next message of candidate, you should follow this logical conditioning.

              if [candidate is asking a question]
                answer the question
                then confirm their understanding
              else 
                ${remainingTaskPrompt}
              `;
          globalMemory.currentCheckpoint.messages.push(
            formatDeveloperMessage(prompt)
          );
        }
      } else {
        // append a approach
      }
    }
    return {
      furtherCall: true,
    };
  },
};
