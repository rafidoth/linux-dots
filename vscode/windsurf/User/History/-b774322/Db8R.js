import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = openai("gpt-4o");

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
    role: "system",
    content: message || "",
  };
}

export async function generateOpenaiResponse(messages, tools) {
  try {
    // If no API key is available, return a default message
    if (!process.env.OPENAI_API_KEY) {
      return "I'm having trouble connecting to my knowledge base. Could you try again or contact support if this persists?";
    }
    let instructions = "";
    if (messages.length % 10 === 0) {
      instructions += `
      To get the problem startement call this function : getProblemStatementById()

      These are some common behavior to be followed always
      ** If candidate anwers very short in one word then ask him to elaborate.**
      **  Learn from the interview transcript given to you and generate human like response.  **
      ** Don't directly ask for code to candidate.**
      ** If candidate ask any question. after replying that question, ask if candidate clear about his query**
      ** If you ask a question to candidate then don't add any other message like feel free to ask** 
      ** do not provide any kind of hint from solution to candidate. Always encourage candidate to think about what to do next.**
      ** if candidate don't ask for example, then give candidate a example to test the understanding **
      ** Candidate can ignore your question by asking another question. Without revealing any hint to solution you can reply candidate's question and ask your previous question that is ignored by Candidate**
      ** Listen to candidate thinking process / how they approach the problem, do question on the approach if necessary**
      ** Don't go to code implementation step if candidate can't make you understand the solving approach ** 
      ** If approach is discuessed and candidate is confident to code then ask him to implement that in his/her language of choice.**
      ** Don't appreciate candidate's partial answer.**
      ** If Candidate is fixing his/her mistake then don't ask question. Just say something in one/two word like "Okay", "yeah", "Got it"**

      Moving To Approach Discussion Guideline
      - Ask for approach discussion if candidate understood the problem statement. 
      - if candidate don't ask for example, then give candidate a example to test the understanding 


      Scenerio : Candidate asked a clarifying question 
      Action : Just Reply to the question and don't ask any other question.





      Code Analysis Guideline
      ** Don't directly tell Candidate where the problem is rather give him hint about mistake without saying exactly where it is. **
      ** Find if there any issue in the code and ask candidate to fix it. Don't directly indicate the mistake rather check if candidate can find it**
      ** Get The solution of the problem using tool function and match it with the candidate's code and generate questions for asking and among them ask one question to candidate**
      ** If the Candidate's code is correct and the solution is correct then generate questions on the solution and ask one question to candidate step by step**
      `;
    }

    // Add code_evaluation to the last message
    const instructed_messages = JSON.parse(JSON.stringify(messages));
    instructed_messages[instructed_messages.length - 1].content += instructions;
    // console.log(instructed_messages);

    // Call the API
    const response = await generateText({
      model,
      tools,
      messages: instructed_messages,
      maxSteps: 2,
      temperature: 0.7,
    });

    return response;
  } catch (error) {
    console.error("Error generating conversation response:", error);
    return "I'm having trouble processing your request. Could you try again?";
  }
}

export async function mainInterviewer(messages, tools) {
  try {
    // If no API key is available, return a default message
    if (!process.env.OPENAI_API_KEY) {
      return "I'm having trouble connecting to my knowledge base. Could you try again or contact support if this persists?";
    }

    const response = await generateText({
      model,
      tools,
      messages,
      maxSteps: 2,
      temperature: 0.7,
    });

    return response;
  } catch (error) {
    console.error("Error generating conversation response:", error);
    return "I'm having trouble processing your request. Could you try again?";
  }
}

export async function generalAssistant(prompt) {
  const response = await generateText({
    model,
    prompt,
    temperature: 0.7,
  });
  return response;
}
