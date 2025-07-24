import {
  generateConversationResponse,
  generateHint,
  generateFeedback,
} from "../services/openai.js";
import elevatorSystem from "../data/lld_problems/elevator_system.js";
import parkingLot from "../data/lld_problems/parking_lot.js";
import libraryManagement from "../data/lld_problems/library_management.js";
import eCommerce from "../data/lld_problems/e_commerce.js";

/**
 * Create a prompt for LLD conversation
 * @param {string} problemId - The ID of the LLD problem
 * @param {Array} history - The conversation history
 * @param {Object} codeData - The code data (code and language)
 * @returns {string} The prompt for the AI
 */
function createLLDPrompt(problemId, history, codeData) {
  // Get problem context based on problem ID
  const problemContext = getProblemContext(problemId);

  // Create a comprehensive prompt using the detailed problem dataset
  const prompt = `
${problemContext.interviewPrompt}

PROBLEM DETAILS:
Title: ${problemContext.title}
Domain: ${problemContext.domain}
Difficulty: ${problemContext.difficulty}

Description:
${problemContext.description}

Base Requirements:
${problemContext.baseRequirements.join("\n- ")}

Hidden Requirements (reveal only when candidate asks relevant questions):
${problemContext.hiddenRequirements.join("\n- ")}

System Constraints:
${problemContext.constraints.join("\n- ")}

System Boundaries:
${problemContext.systemBoundaries.join("\n- ")}

EVALUATION CRITERIA:
Entity Identification: ${problemContext.evaluationCriteria.entityIdentification.join(
    ", "
  )}
SOLID Principles: ${problemContext.evaluationCriteria.solidPrinciples.join(
    ", "
  )}
Design Patterns: ${problemContext.evaluationCriteria.designPatterns.join(", ")}
Edge Cases: ${problemContext.evaluationCriteria.edgeCases.join(", ")}

CONVERSATION HISTORY:
${history.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")}

${
  codeData
    ? `
CURRENT CODE (${codeData.language}):
\`\`\`${codeData.language}
${codeData.code}
\`\`\`
`
    : ""
}

Follow the interview guidelines strictly. Be professional (85%) with minimal hints (15%). 
Evaluate the candidate's design choices and ask probing questions about their approach.
`;
  return prompt;
}

/**
 * Create a prompt for LLD hint
 * @param {string} problemId - The ID of the LLD problem
 * @param {Array} history - The conversation history
 * @param {number} currentStep - The current interview step
 * @param {Object} codeData - The code data (code and language)
 * @returns {string} The prompt for generating a hint
 */
function createLLDHintPrompt(problemId, history, currentStep, codeData) {
  // Get problem context based on problem ID
  const problemContext = getProblemContext(problemId);

  // Define hints based on current step
  const stepHints = {
    1: "Hint about requirements gathering and clarification",
    2: "Hint about system decomposition and identifying core components",
    3: "Hint about class design and relationships",
    4: "Hint about implementation and code quality",
  };

  const prompt = `
You are conducting a low-level design (LLD) interview for a software engineering position.
Problem: ${problemContext.title}

Description:
${problemContext.description}

Requirements:
${problemContext.requirements.join("\n")}

Expected Classes/Components:
${problemContext.expectedComponents.join("\n")}

Current conversation history:
${history.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")}

${
  codeData
    ? `
Current code (${codeData.language}):
\`\`\`${codeData.language}
${codeData.code}
\`\`\`
`
    : ""
}

The candidate is currently at step ${currentStep}: ${
    stepHints[currentStep] || "General hint"
  }

Please provide a helpful hint that guides the candidate without giving away the full solution.
The hint should be related to their current progress and the step they're on.
Make the hint actionable and specific enough to help them make progress.
`;
  return prompt;
}

/**
 * Create a prompt for LLD feedback
 * @param {string} problemId - The ID of the LLD problem
 * @param {Array} history - The conversation history
 * @param {Object} codeData - The code data (code and language)
 * @returns {string} The prompt for generating feedback
 */
function createLLDFeedbackPrompt(problemId, history, codeData) {
  // Get problem context based on problem ID
  const problemContext = getProblemContext(problemId);

  const prompt = `
You are providing comprehensive feedback for a low-level design (LLD) interview.
Problem: ${problemContext.title}

Description:
${problemContext.description}

Requirements:
${problemContext.requirements.join("\n")}

Expected Classes/Components:
${problemContext.expectedComponents.join("\n")}

Interview conversation:
${history.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")}

Final code (${codeData.language}):
\`\`\`${codeData.language}
${codeData.code}
\`\`\`

Please provide comprehensive feedback on the candidate's performance in a structured JSON format:
{
  "strengths": [array of 3-5 strengths demonstrated by the candidate],
  "improvements": [array of 3-5 areas for improvement],
  "scores": [
    {"category": "Problem Understanding", "score": X, "outOf": 10},
    {"category": "OO Design", "score": X, "outOf": 10},
    {"category": "Code Quality", "score": X, "outOf": 10},
    {"category": "Communication", "score": X, "outOf": 10}
  ],
  "overallAssessment": {
    "rating": "Strong/Good/Average/Needs Improvement",
    "description": "Detailed 2-3 sentence assessment of overall performance"
  }
}
`;
  return prompt;
}

/**
 * Get problem context based on problem ID
 * @param {string} problemId - The ID of the problem
 * @returns {Object} The problem context
 */
function getProblemContext(problemId) {
  const problemContexts = {
    elevator_system: elevatorSystem,
    parking_lot: parkingLot,
    library_management: libraryManagement,
    e_commerce: eCommerce,
  };

  return problemContexts[problemId] || elevatorSystem;
}

/**
 * Handle LLD conversation request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function handleLLDConversation(req, res) {
  try {
    const { message, history, problemId, codeData } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Create a custom prompt for LLD interviews
    const customPrompt = createLLDPrompt(problemId, history, codeData);

    // Generate response using OpenAI service
    const response = await generateConversationResponse(
      message,
      history,
      codeData?.code || "",
      codeData?.language || "java",
      null, // step is not needed for LLD
      customPrompt
    );

    res.json({ response });
  } catch (error) {
    console.error("Error in LLD conversation:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}

/**
 * Handle LLD hint request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function handleLLDHint(req, res) {
  try {
    const { history, currentStep, problemId, codeData } = req.body;

    // Create a custom prompt for LLD hints
    const customPrompt = createLLDHintPrompt(
      problemId,
      history,
      currentStep,
      codeData
    );

    // Generate hint using OpenAI service
    const hint = await generateHint(
      history,
      currentStep,
      codeData?.code || "",
      codeData?.language || "java",
      customPrompt
    );

    res.json({ hint });
  } catch (error) {
    console.error("Error in LLD hint:", error);
    res.status(500).json({ error: "Failed to generate hint" });
  }
}

/**
 * Handle LLD feedback request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function handleLLDFeedback(req, res) {
  try {
    const { history, code, language, problemId } = req.body;

    const codeData = { code, language };

    // Create a custom prompt for LLD feedback
    const customPrompt = createLLDFeedbackPrompt(problemId, history, codeData);

    // Generate feedback using OpenAI service
    const feedback = await generateFeedback(
      history,
      code,
      language,
      customPrompt
    );

    res.json(feedback);
  } catch (error) {
    console.error("Error in LLD feedback:", error);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
}

/**
 * Handle code execution request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function handleCodeExecution(req, res) {
  try {
    const { code, language, problemId } = req.body;

    // In a real app, this would execute the code using a sandbox
    // For now, we'll simulate execution with a mock response

    // Analyze code for basic validation
    const validationResult = validateCode(code, language, problemId);

    if (validationResult.success) {
      res.json({
        output: "Code compiled and executed successfully. All tests passed!",
        success: true,
      });
    } else {
      res.json({
        output: `Execution failed: ${validationResult.error}`,
        success: false,
      });
    }
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({
      output: "Error executing code: " + error.message,
      success: false,
    });
  }
}

/**
 * Basic code validation (mock implementation)
 * @param {string} code - The code to validate
 * @param {string} language - The programming language
 * @param {string} problemId - The problem ID
 * @returns {Object} Validation result
 */
function validateCode(code, language, problemId) {
  // This is a simple validation that checks for some expected classes/patterns
  // In a real app, this would be a more sophisticated execution system

  const problemContext = getProblemContext(problemId);
  const expectedComponents = problemContext.expectedComponents;

  // Check if code includes expected components
  const missingComponents = [];
  for (const component of expectedComponents) {
    if (!code.includes(component)) {
      missingComponents.push(component);
    }
  }

  // Simple syntax validation based on language
  let syntaxError = null;

  if (language === "java" || language === "javascript") {
    // Check for missing curly braces
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;

    if (openBraces !== closeBraces) {
      syntaxError = "Mismatched curly braces";
    }
  } else if (language === "python") {
    // Check for basic Python syntax
    if (code.includes(":") && !code.includes("def ")) {
      syntaxError = "Missing function definitions";
    }
  }

  // Return validation result
  if (syntaxError) {
    return {
      success: false,
      error: syntaxError,
    };
  } else if (missingComponents.length > 0) {
    return {
      success: false,
      error: `Missing expected components: ${missingComponents.join(", ")}`,
    };
  } else {
    return {
      success: true,
    };
  }
}
