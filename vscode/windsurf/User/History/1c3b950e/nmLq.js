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
          console.log("Checkpoint Memory", globalMemory.checkpointMemory);
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
