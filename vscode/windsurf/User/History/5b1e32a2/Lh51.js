import OpenAI from "openai";

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
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    temperature: 0.7,
    tools,
  });

  return response.choices[0].message.content;
}
