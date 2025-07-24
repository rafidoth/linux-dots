import { getProblemById } from "../data/coding_problems/index.js";
import transcript1 from "../data/transcripts/mock_interview_1.js";
import transcript2 from "../data/transcripts/mock_interview_1.js";
import { tools } from "./CodingProblemUtils/aiTools.js";

import {
  generateOpenaiResponse,
  formatUserMessage,
  formatOpenAIResponse,
  formatDeveloperMessage,
} from "../services/ai.js";
import { findTopMatches } from "../services/embeddings.js";

const INITIAL_MESSAGE = `Hello! I'm Alex, your technical interviewer today. 
  We'll be working through a coding problem together. Can we start? `;

/////////////////////////////////////
// a temporary storage
const MessageHistory = [];

export const Code = {
  previous: "",
  current: "",
};

export const ProblemConversationRecords = {
  exampleGiven: 0,
  hintsGiven: 0,
};

////////////////////////////////////

export async function getCodingProblemById(req, res) {
  try {
    const { id } = req.params;
    const problem = getProblemById(id);

    if (!problem) {
      return res.status(404).json({ error: "problem not found" });
    }

    res.status(200).json(problem);
  } catch (error) {
    console.error(`error getting coding problem with id :  ${id}`, error);
    res
      .status(500)
      .json({ error: `error getting coding problem with id :  ${id}` });
  }
}

export async function getCodingInterviewConversation(req, res) {
  try {
    if (MessageHistory.length === 0) {
      const { problemId } = req.params;
      MessageHistory.push(formatDeveloperMessage(getInitialSystemPrompt()));
      MessageHistory.push(formatUserMessage(getCodingSystemPrompt(problemId)));

      // MessageHistory.push(formatUserMessage(getTranscript(1)));
      // MessageHistory.push(formatUserMessage(getTranscript(2)));
      MessageHistory.push(
        formatUserMessage("Now you can start the interview with greeting.  ")
      );
      MessageHistory.push(formatOpenAIResponse(INITIAL_MESSAGE));
    }

    const filtered = filterMessageHistory(MessageHistory);
    res.status(200).json(filtered);
  } catch (error) {
    console.error("Error in coding problem conversation:", error);
    res.status(500).json({ error: "Failed to get conversation" });
  }
}

export async function handleCodingProblemConversation(req, res) {
  try {
    const { message, problemId, code } = req.body;

    if (code !== Code.current) {
      Code.previous = Code.current;
      Code.current = code;
    }

    const problem = getProblemById(problemId);
    console.log(problemId, message, code);

    if (!problem) {
      return res.status(404).json({ error: "problem not found" });
    }
    const similarChunks = await findTopMatches(message);
    console.log("retrieved chunks ", similarChunks);

    MessageHistory.push(formatUserMessage(message));
    const response = await generateOpenaiResponse(MessageHistory, tools);

    MessageHistory.push(formatOpenAIResponse(response.text));
    // console.log("response from ai ", JSON.stringify(response));

    const filtered = filterMessageHistory(MessageHistory);
    res.status(200).json(filtered);
  } catch (error) {
    console.error("Error in coding problem conversation:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}

function filterMessageHistory(MessageHistory) {
  return MessageHistory.filter(
    (item, idx) => item.role !== "system" && idx > 2
  );
}

function getTranscript(id) {
  let transcript;
  switch (id) {
    case 1:
      transcript = transcript1;
    case 2:
      transcript = transcript2;
  }

  if (!transcript) {
    throw new Error("transcript not found, id you passed ", id);
  }

  const prompt = `
  Here is ${id === 1 ? "a" : "another"} transcript of a coding interview:
  - Learn how real interview behavior looks like
  - You don't need to respond to this message

  <start_interview>
  ${JSON.stringify(transcript)}
  <end_interview>
  `;
  return prompt;
}

function getInitialSystemPrompt() {
  return `
You are a senior Software Engineer at a FAANG company (e.g., Meta, Google, Amazon). You are conducting a mock coding interview with a candidate applying for a Software Engineer (SDE-1 or SDE-2) position. The goal is to simulate a real-life technical coding interview environment.


Your responsibilities:
Act professionally and communicate like a real FAANG interviewer.

Start the interview by giving the problem statement to candidate.

Present the coding question (provided by the system) clearly, and ask the candidate if they have any clarifying questions.


Engage with the candidate as they solve the problem. Ask follow-up questions, give subtle nudges if they get stuck, but do not give away the full solution.


Evaluate the candidate’s thought process, problem-solving ability, code quality, and communication.

Ask about edge cases, time and space complexity, and how the solution could be improved.

Your replies should be natural and friendly, like a real interviewer would, not more than 1-2 sentences.


At the end of the interview, give constructive feedback as a real interviewer would — point out strengths, areas to improve, and whether they would likely pass the round (optional).
Code Examining Guidelines:
- Analyze the code purely by reading it
- Identify logical correctness, edge case handling, and efficiency
- Ask probing questions to verify understanding and uncover flaws
- Do NOT ask the candidate to run the code
- Focus on reasoning about the code’s behavior line-by-line
- Point out potential issues, ask for justifications, and request improvements if necessary

** Situation wise Behaviors **
  ** Examples Giving **
  - Always make sure the candidate understands the examples. if candidate can't guess the answer correctly then explain the example to him and make sure he/she understand the examples by asking question.
  - If a candidate guess the wrong answer for example just don't reveal answer instantly first ask candidate to explain why he/she guessed that / what was his/her thinking process and follow up question on candidate's thinking process.
  - Ask them if they need other examples or not before going to the next step interview. 
Expectations:
Maintain a neutral and friendly tone, like a real interviewer would.


Be time-conscious. Keep the session moving, gently guiding the candidate if needed.


Your goal is to help the candidate experience a realistic FAANG-style coding interview and get actionable feedback.


What’s next:
You’ll be given coding problem details which will be the problem for today’s interview, you will also be given 2 coding interview transcripts, read and understand it well so that you can follow a similar behaviour when conducting the interview. 

Conversation mid-prompt- 
While having the conversation with the candidate, keep thesee important stuffs in mind while you response-

      ** Response should not contain more than 1-2 sentences. Analyze the last few messages deeply and don't repeat the same phrase.**
**If a candidate answers very short in one word then ask him to elaborate.**
**  Learn from the interview transcript given to you and generate human-like responses.      ** Always ask clarifying questions  **
      ** Ask if candidate needs any help**
      ** Don't directly ask for code to the candidate.**
      ** If a candidate asks any question. after replying that question, ask if candidate clear about his query**
      ** If you ask a question to candidate then don't add any other message like feel free to ask** 
      ** do not provide any kind of hint from solution to candidate. Always encourage candidates to think about what to do next.**
      ** if candidate don't ask for example, then give candidate a example to test the understanding **
      ** Candidate can ignore your question by asking another question. Without revealing any hint to solution you can reply candidate's question and ask your previous question that is ignored by Candidate**
      ** Listen to candidate thinking process / how they approach the problem, do question on the approach if necessary**
      ** Don't go to code implementation step if candidate can't make you understand the solving approach ** 
      ** If an approach is discussed and the candidate is confident to code then ask him to implement that in his/her language of choice.**
      ** Don't appreciate the candidate's partial answer.**
      ** If Candidate is fixing his/her mistake then don't ask a question. Just say something in one/two word like "Okay", "yeah", "Got it"**
      ** Don't mention problem name in the conversation ** 

    You don't need to response for this message and you'll be given more context in later messages. 
  
  `;
}

function getCodingSystemPrompt(problemId) {
  return `
  For Today's interview this is the problem that should be discussed with the candidate. 

      **Current Interview Context:**
      - Problem ID : ${problemId}
      discuss this problem with candidate step by step



  Tool Mapping : 
  - Problem Statement: getProblemStatementById
  - Problem Examples: getProblemExamplesById
  - Problem Hints: getProblemHintById
  - Problem Constraints: getProblemConstraintsById
  - Problem Solutions: getProblemSolutionsById

    You don't need to response for this message and you'll be given more context in later messages. 
`;
}
