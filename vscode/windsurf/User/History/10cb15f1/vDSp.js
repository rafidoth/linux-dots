import { generateQuestions } from "../services/interactionWithLLM.js";
import {
  createNewQuizSet,
  retrieveContextDB,
  retrieveMcqQuizset,
  saveContextDB,
  saveMcqQuizzesDB,
} from "../services/supabase.js";

const qs = [
  {
    answer: 0,
    answerExplanation:
      "The article states that Professor Muhammad Yunus urged the UN to develop a mechanism to fight disinformation.",
    choices: [
      "World Bank",
      "United Nations",
      "European Union",
      "International Monetary Fund",
    ],
    difficulty: "easy",
    question:
      "Which organization was urged by Professor Muhammad Yunus to develop an effective mechanism to fight disinformation?",
    questionType: "mcq",
  },
  {
    answer: 2,
    answerExplanation: "The report was jointly prepared by UNDP and UNESCO.",
    choices: [
      "World Bank and UN",
      "UNICEF and WHO",
      "UNDP and UNESCO",
      "IMF and World Bank",
    ],
    difficulty: "easy",
    question:
      "Which organizations jointly prepared the report 'An Assessment of Bangladesh's Media Landscape'?",
    questionType: "mcq",
  },
  {
    answer: 1,
    answerExplanation:
      "The Chief Adviser mentioned that disinformation is spread by people living outside and some local people.",
    choices: [
      "Government officials only",
      "People living outside and local people",
      "Only local people",
      "International organizations",
    ],
    difficulty: "medium",
    question:
      "According to the Chief Adviser, who is spreading disinformation?",
    questionType: "mcq",
  },
  {
    answer: 3,
    answerExplanation:
      "The Chief Adviser suggested that media outlets spreading disinformation should be reminded that they are not trustworthy.",
    choices: [
      "Be fined heavily",
      "Be shut down immediately",
      "Be praised for their courage",
      "Be reminded that it is not trustworthy",
    ],
    difficulty: "medium",
    question:
      "What did the Chief Adviser suggest should happen to media outlets that continue to spread disinformation?",
    questionType: "mcq",
  },
  {
    answer: 0,
    answerExplanation:
      "Susan Vize is the Head of Office and UNESCO Representative to Bangladesh.",
    choices: [
      "Head of Office and UNESCO Representative to Bangladesh",
      "UNDP Representative to Bangladesh",
      "World Bank Representative to Bangladesh",
      "UN Secretary-General",
    ],
    difficulty: "easy",
    question: "What is Susan Vize's role?",
    questionType: "mcq",
  },
  {
    answer: 2,
    answerExplanation:
      "The report launching would highlight the issue of self-regulation.",
    choices: [
      "Government regulation",
      "International regulation",
      "Self-regulation",
      "No regulation",
    ],
    difficulty: "medium",
    question:
      "According to Susan Vize, what issue would the report being launched highlight?",
    questionType: "mcq",
  },
  {
    answer: 1,
    answerExplanation:
      "Mehdi Benchelah is a Senior Project Officer, Freedom of Expression and Safety of Journalists Section, UNESCO.",
    choices: [
      "Junior Project Officer, UNDP",
      "Senior Project Officer, Freedom of Expression and Safety of Journalists Section, UNESCO",
      "Chief Adviser to the UN",
      "Head of Office, World Bank",
    ],
    difficulty: "easy",
    question: "What is Mehdi Benchelah's role?",
    questionType: "mcq",
  },
  {
    answer: 0,
    answerExplanation:
      "The report will make recommendations about journalists' working conditions and the safety of female journalists in newsrooms.",
    choices: [
      "Journalists' working conditions and the safety of female journalists",
      "Government policies and regulations",
      "Economic development and growth",
      "Environmental protection and sustainability",
    ],
    difficulty: "medium",
    question:
      "According to Mehdi Benchelah, what will the report also make some recommendations about?",
    questionType: "mcq",
  },
  {
    answer: 2,
    answerExplanation:
      "The report is prepared under the framework of UNDP's Strengthening Institutions, Policies and Services (SIPS) project.",
    choices: [
      "UNESCO's Media Development Project",
      "World Bank's Economic Growth Project",
      "UNDP's Strengthening Institutions, Policies and Services (SIPS) project",
      "UNICEF's Child Protection Project",
    ],
    difficulty: "medium",
    question: "Under which project's framework is the report prepared?",
    questionType: "mcq",
  },
  {
    answer: 3,
    answerExplanation:
      "The UNESCO's mandate is to promote freedom of expression and media development.",
    choices: [
      "Promote economic growth and development",
      "Ensure global security and peace",
      "Provide humanitarian aid and assistance",
      "Promote freedom of expression and media development",
    ],
    difficulty: "easy",
    question: "What is UNESCO's mandate in alignment with the report?",
    questionType: "mcq",
  },
];

export async function generateQuestionsController(req, res) {
  const { userId, knowledge, instructions, quantity, questionType } = req.body;
  console.log("generate request received from user id ", userId);
  console.log(knowledge);

  // check if the user is valid
  // check all fields are valid

  // const response = await generateQuestions(
  //   quantity,
  //   knowledge,
  //   instructions,
  //   questionType
  // );

  const quizzes = qs;
  const quizset = await createNewQuizSet(
    "title not added yet",
    userId,
    "private"
  );
  await saveMcqQuizzesDB(quizzes, quizset.id);
  await saveContextDB(knowledge, quizset.id);

  res.status(200).json({ quizsetId: quizset.id });
}

export async function getQuestionsController(req, res) {
  const userId = req.headers["x-user-id"];
  const { quizsetId } = req.params;
  console.log("getQuestions request received from user id ", userId);
  console.log(quizsetId);

  // check if the user is valid
  // check all fields are valid

  const quizzes = await retrieveMcqQuizset(quizsetId);
  const context = await retrieveContextDB(quizsetId);
  res.status(200).json({ quizzes, context });
}
