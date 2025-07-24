import OpenAI from "openai";
import { toolRouter } from "./socketio.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateOpenaiResponse(conversation, tools) {
  try {
    // If no API key is available, return a default message
    if (!process.env.OPENAI_API_KEY) {
      return "I'm having trouble connecting to my knowledge base. Could you try again or contact support if this persists?";
    }

    // Call the API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: conversation,
      temperature: 0.7,
      max_tokens: 1200,
      tools,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating conversation response:", error);
    return "I'm having trouble processing your request. Could you try again?";
  }
}

export function formatUserMessage(message) {
  return {
    role: "user",
    content: message || "",
  };
}
export function formatOpenAIResponse(message) {
  return {
    role: "assistant",
    content: message || "",
  };
}

export function formatDeveloperMessage(message) {
  return {
    role: "developer",
    content: message || "",
  };
}

export async function mainInterviewer(messages, tools) {
  console.log("===================================");
  console.log("Asking Main Interviewer with context");
  // console.log("messages", messages);
  // console.log("tools", tools);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    temperature: 0.7,
    tools,
    tool_choice: "auto",
  });

  const choice = response.choices[0];
  if (choice.finish_reason === "tool_calls") {
    const toolCall = choice.message.tool_calls[0];
    const toolFn = toolRouter[toolCall.function.name];
    const args = JSON.parse(toolCall.function.arguments);
    console.log(toolCall);
    console.log("tool call", toolFn, args);
    const toolResult = await toolFn(args);
    if (toolResult.furtherCall) {
      return await shortReplyAssistant(messages);
    }
  }

  console.log("Main Interviewer response from openai", response.choices);
  console.log("===================================");

  return response.choices[0].message.content;
}

export async function shortReplyAssistant(messages) {
  console.log("Secondary LLM Call with Messages only");
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}

export async function summerizerAssistant(messages, prompt) {
  const response = await openai.responses.create({
    model: "gpt-4o",
    input: `${messages}

    ${prompt}`,
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}
