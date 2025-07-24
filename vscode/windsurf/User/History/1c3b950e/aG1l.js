import {
  formatDeveloperMessage,
  formatOpenAIResponse,
  formatUserMessage,
  InterviewerAI,
  shortReplyAssistant,
  summerizerAssistant,
} from "./openai_utils.js";
import {
  getProblemIDContext,
  getProblemUnderstandingPrompt,
  getSolutionApproachDiscussionPrompt,
} from "./prompts.js";

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
      name: "getCandidateProgressBasedInstruction",
      description:
        "In solution approach discussion checkpoint either reply to the candidate's question or call this function to get instruction for what to do next.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
];

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
    globalMemory.problemId = problemId;
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
        globalMemory.currentCheckpoint.messages.push(
          formatUserMessage(message)
        );
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
