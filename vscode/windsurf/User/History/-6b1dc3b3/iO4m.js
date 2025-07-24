import {
  formatDeveloperMessage,
  formatOpenAIResponse,
  formatUserMessage,
  InterviewerAI,
  shortReplyAssistant,
  summerizerAssistant,
} from "./openai_utils.js";
import { getProblemById } from "../data/coding_problems/index.js";
import { glob } from "fs";

// problem understanding(pu)
const puTools = [
  {
    type: "function",
    function: {
      name: "getProblemStatementByProblemId",
      description:
        "Get problem statement by problem id. This function should be called when you need to provide the problem statement to the candidate.",
      parameters: {
        type: "object",
        properties: {
          problemId: {
            type: "string",
            description:
              "problem id of the coding problem which was given to you at the start of the interview",
          },
        },
        required: ["problemId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getExamplesByProblemId",
      description:
        "Get examples by problem id. This function should be called when you need to provide the examples to the candidate.",
      parameters: {
        type: "object",
        properties: {
          problemId: {
            type: "string",
            description:
              "problem id of the coding problem which was given to you at the start of the interview",
          },
        },
        required: ["problemId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "checkProblemUnderstandingCheckpoint",
      description:
        "You must call this function before discussing solution approach with candidate or before asking candidate to move to next checkpoint. This function should be called when basic problem understanding is completed and candidate dont have any questions before moving to next checkpoint which is solution approach discussion. It doesn't need any parameters.",
      parameters: {},
    },
  },
];

// solution approach discussion(sad)
const sadTools = [
  {
    type: "function",
    function: {
      name: "getProblemStatementByProblemId",
      description:
        "Get problem statement by problem id. This function should be called when you need to provide the problem statement to the candidate.",
      parameters: {
        type: "object",
        properties: {
          problemId: {
            type: "string",
            description:
              "problem id of the coding problem which was given to you at the start of the interview",
          },
        },
        required: ["problemId"],
      },
    },
  },
];

const getProblemUnderstandingPrompt = () => {
  return `
You are a Senior Software Engineer at a FAANG company (e.g., Meta, Google, Amazon). You're conducting a mock coding interview for a Software Engineer (SDE-1 or SDE-2) position. The goal is to simulate a real-life technical interview environment.

This is the first checkpoint of the interview. Your responsibilities:
1 - Present the problem statement.
2 - Check the candidate’s understanding.
3 - Clarify any confusion regarding the problem.

Your tasks:
1. Analyze the candidate’s last few replies step by step.  
2. Respond like a human interviewer or call a tool (e.g., for checkpoint transition).  
3. Before discussing the solution approach or asking to move to the next phase, you must call: checkProblemUnderstandingCheckpoint()
Do not say things like “Let’s move on to the solution approach” until this is called.


<behavioral guidelines>
- Responses must be concise (1-2 sentences), clear, and human-like.
- If the candidate replies in one word, ask them to elaborate.
- If the candidate asks a question, answer it, then confirm their understanding.
- If you ask a question, do **not** follow up with filler (e.g., "feel free to ask").
- Never give hints about the solution. Encourage the candidate to think about next steps.
- If the candidate doesn't ask for an example, provide one to test their understanding.
- If the candidate avoids your question by asking another, answer their query (without hinting at the solution), then repeat your original question.
- If you think candidate has not completed the sentence or sent partial sentence tell then you can choose not to reply.
- If you don't understand what candidate is trying to say, ask them to rephrase.
<behavioral guidelines>
`;
};

const getSolutionApproachDiscussionPrompt = (summary) => {
  const problem = getProblemById(globalMemory.problemId);
  const solutions = Object.keys(problem.solutions).map((solution) => {
    const description = problem.solutions[solution].description;
    const approachName = problem.solutions[solution].approach;
    const type = problem.solutions[solution].type;
    return { approachName, description, type };
  });

  return `
    You are a Senior Software Engineer at a FAANG company (e.g., Meta, Google, Amazon). You're conducting a mock coding interview for a Software Engineer (SDE-1 or SDE-2) position. The goal is to simulate a real-life technical interview environment.

    The candidate has already discussed the problem statement and examples. You can use the summary of the previous checkpoint to continue the conversation.

    <ProblemStatement>
    ${problem.description}
    <ProblemStatement>

    <summary>
    ${summary}
    <summary>

    Your responsibility for this checkpoint is to:
     1 - Discuss about the solution approaches with candidate.
     2 - Identify which solution candidate is going towards. Solutions for this problem are here
        ${JSON.stringify(solutions)}
     3 - call necessary tools when needed.

    behavioral guidelines

    - Responses must be concise (1-2 sentences), clear, and human-like.

    - If the candidate replies in one word, ask them to elaborate.

    - If you think candidate has not completed the sentence or sent partial sentence tell then you can choose not to reply.

    - If you don't understand what candidate is trying to say, ask them to rephrase.

    -Don't reveal any parts of the solution to candidate.
  `;
};
const globalMemory = {
  socket: null,
  problemId: null,
  currentCheckpoint: null,
  checkpointMemory: [
    {
      id: 0,
      checkpointTitle: "ProblemUnderstanding",
      checkpointStatus: false,
      messages: [],
      systemPrompt: getProblemUnderstandingPrompt(),
      tools: puTools,
      summary: null,
    },
    {
      id: 1,
      checkpointTitle: "SolutionApproachDiscussion",
      checkpointStatus: false,
      messages: [],
      systemPrompt: null,
      tools: sadTools,
      summary: null,
      triedApproaches: [],
      /*
          {
            approachType : "naive"/ "optimal" 
            tasks : [
              {
                taskType : "question/coding/timecomplexity/spacecomplexity"
                content : "question content"
                passed : "true/false"

              },
              ....
            ]
          } 
        */
    },
    {
      id: 2,
      checkpointTitle: "CodeImplementation",
      checkpointStatus: false,
      messages: [],
      systemPrompt: null,
      tools: puTools,
      summary: null,
    },
    {
      id: 3,
      checkpointTitle: "QNA",
      checkpointStatus: false,
      messages: [],
      systemPrompt: null,
      tools: puTools,
      summary: null,
    },
  ],
};

export async function setupSocketIOHandlers(io) {
  io.on("connect", async (socket) => {
    globalMemory.socket = socket;
    globalMemory.currentCheckpoint = globalMemory.checkpointMemory[0];
    const problemId = await socket.emitWithAck("getProblemId", "");
    console.log("Interview Intiated with problem id ", problemId);

    const INITIAL_MESSAGE = `Hello! I'm Alex, your technical interviewer today. 
    We'll be working through a coding problem together. Can we start? `;
    console.log("a user connected with id ", socket.id);

    globalMemory.currentCheckpoint.messages.push(
      formatDeveloperMessage(globalMemory.currentCheckpoint.systemPrompt)
    );
    globalMemory.currentCheckpoint.messages.push(
      formatDeveloperMessage(getProblemIDContext(problemId))
    );
    globalMemory.currentCheckpoint.messages.push(
      formatOpenAIResponse(INITIAL_MESSAGE)
    );
    socket.emit("candidate", INITIAL_MESSAGE);

    socket.on("interviewer", async (message) => {
      try {
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

            const prompt = `  
              candidate is discussing ${lastApproach.approachType} approach
              To response the next message of candidate, you should follow step by step.
              if [candidate is asking a question]
                answer the question
              
            `;

            globalMemory.currentCheckpoint.messages.push(
              formatUserMessage(message)
            );
          }
        } else {
          globalMemory.currentCheckpoint.messages.push(
            formatUserMessage(message)
          );
        }
        const response = await InterviewerAI(
          globalMemory.currentCheckpoint.messages,
          globalMemory.currentCheckpoint.tools
        );
        if (response) {
          globalMemory.currentCheckpoint.messages.push(
            formatOpenAIResponse(response)
          );
          socket.emit("candidate", response);
        }
      } catch (error) {
        console.error("Error processing message:", error);
        socket.emit(
          "candidate",
          "I'm having trouble processing your request. Could you try again?"
        );
      }
    });
  });
}

// OpenAI function calling format for the same tools

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
        formatDeveloperMessage(pu_summary)
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
};

function getProblemIDContext(problemId) {
  return `
  For Today's interview this is the problem that should be discussed with the candidate. 

  **Current Interview Context:**
  - Problem ID : ${problemId}
  discuss this problem with candidate step by step

  You don't need to response for this message and you'll be given more context in later messages. 
`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
