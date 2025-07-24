import {
  formatDeveloperMessage,
  formatOpenAIResponse,
  formatUserMessage,
  InterviewerAI,
} from "./openai_utils.js";
import globalMemory from "./memory.js";

import { getProblemIDContext } from "./prompts.js";

export async function setupSocketIOHandlers(io) {
  io.on("connect", async (socket) => {
    // Store socket reference in global memory for use in other modules
    globalMemory.socket = socket;

    // Initialize the first checkpoint (Problem Understanding phase)
    globalMemory.currentCheckpoint = globalMemory.checkpointMemory[0];

    // Request problem ID from the client using acknowledgement pattern
    const problemId = await socket.emitWithAck("getProblemId", "");
    globalMemory.problemId = problemId;
    console.log("Interview Intiated with problem id ", problemId);

    // Define the initial greeting message from the interviewer
    const INITIAL_MESSAGE = `Hello! I'm Alex, your technical interviewer today. 
    We'll be working through a coding problem together. Can we start? `;
    console.log("a user connected with id ", socket.id);

    // Initialize the conversation history with system context
    // 1. Add the system prompt that defines the interviewer's behavior
    globalMemory.currentCheckpoint.messages.push(
      formatDeveloperMessage(globalMemory.currentCheckpoint.systemPrompt)
    );

    // 2. Add problem-specific context to help guide the interview
    globalMemory.currentCheckpoint.messages.push(
      formatDeveloperMessage(getProblemIDContext(problemId))
    );

    // 3. Add the initial greeting as the first AI message in the conversation
    globalMemory.currentCheckpoint.messages.push(
      formatOpenAIResponse(INITIAL_MESSAGE)
    );

    // Send the initial greeting to the client
    socket.emit("candidate", INITIAL_MESSAGE);

    // Handle incoming messages from the candidate
    socket.on("interviewer", async (message) => {
      try {
        // Add the candidate's message to the conversation history
        globalMemory.currentCheckpoint.messages.push(
          formatUserMessage(message)
        );

        // Generate AI interviewer's response based on conversation history
        // Also passing available tools that the AI can use (defined in the checkpoint)
        const response = await InterviewerAI(
          globalMemory.currentCheckpoint.messages,
          globalMemory.currentCheckpoint.tools
        );

        // If a valid response was generated
        if (response) {
          // Add the AI's response to conversation history
          globalMemory.currentCheckpoint.messages.push(
            formatOpenAIResponse(response)
          );

          // Send the AI's response back to the candidate
          socket.emit("candidate", response);
        }
      } catch (error) {
        // Handle any errors that occur during processing
        console.error("Error processing message:", error);
        socket.emit(
          "candidate",
          "I'm having trouble processing your request. Could you try again?"
        );
      }
    });
  });
}
