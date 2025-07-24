import { useState } from "react";
import { generateQuestions } from "../api";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import QuizCard from "./QuizCard";
import { Button } from "@/components/ui/button";
import SelectList from "@/src/components/SelectList";
import DialogBox from "../components/DialogBox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
function QuizGenerationPage() {
  const [generationSettings, setGenerationSettings] = useState({
    questionType: "multiple-choice",
    questionCount: 20,
    instruction: "",
    context: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [contextFieldOpen, setContextFieldOpen] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [contextTitle, setContextTitle] = useState("");

  const changeInstruction = (e) => {
    setGenerationSettings({
      ...generationSettings,
      instruction: e.target.value,
    });
  };

  const changeContext = (e) => {
    setGenerationSettings({
      ...generationSettings,
      context: e.target.value,
    });
  };

  const changeQuestionType = (e) => {
    setGenerationSettings({
      ...generationSettings,
      questionType: e.target.value,
    });
  };

  const changeQuestionCount = (num) => {
    const value = parseInt(num);
    if (!isNaN(value)) {
      setGenerationSettings({
        ...generationSettings,
        questionCount: value,
      });
    }
  };

  const handleGenerate = async () => {
    if (!generationSettings.context.trim()) {
      // TODO: Show toast
      return;
    }

    if (generationSettings.context.trim().length > 10) {
      setIsGenerating(true);
      const response = await generateQuestions({
        quantity: generationSettings.questionCount,
        knowledge: generationSettings.context,
        instructions: generationSettings.instruction,
        questionType: generationSettings.questionType,
      });
      console.log(response);
      setQuizzes(response);
      if (contextTitle.length === 0) {
        setContextTitle(response[0].title);
      }
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full w-full flex  space-y-6">
      <div
        className={`${
          contextFieldOpen ? "w-1/2" : "w-full"
        } h-full transition-all duration-500 p-6`}
      >
        <div>
          <div className="flex items-center gap-2">
            <div>Create Exam</div>

            {isGenerating ? (
              <Button variant={"outline"} className={"cursor-not-allowed"}>
                <div>Generating...</div>
              </Button>
            ) : (
              <DialogBox
                title="Generate Quiz"
                description="Tweak the settings to create questions just the way you like."
                action={handleGenerate}
              >
                <div className="flex flex-col gap-y-2">
                  <SelectList
                    value={generationSettings.questionType}
                    onValueChange={(value) => changeQuestionType(value)}
                    label="Question Type"
                    itemsList={[
                      { value: "multiple-choice", label: "Multiple Choice" },
                    ]}
                  />
                  <SelectList
                    value={generationSettings.questionCount}
                    onValueChange={(value) => changeQuestionCount(value)}
                    label="Choose how many questions to create"
                    itemsList={Array.from({ length: 40 }, (_, i) => {
                      if (i % 5 === 4 && i >= 9) {
                        return {
                          value: i + 1,
                          label: i + 1,
                        };
                      }
                    }).filter((item) => item !== undefined)}
                  />
                  <div className="flex flex-col gap-y-2">
                    <Label>Instruction</Label>
                    <Textarea
                      value={generationSettings.instruction}
                      onChange={(e) => changeInstruction(e)}
                      className={"h-[150px]"}
                      placeholder={
                        "example : make 50% questions harder and 50% questions easier"
                      }
                    ></Textarea>
                  </div>
                </div>
              </DialogBox>
            )}
          </div>
          <Button asChild variant={"outline"} className={"py-5 my-5"}>
            <Label className={`text-3xl font-bold`}>{contextTitle}</Label>
          </Button>
          <div className="max-h-[calc(100vh-70px)] overflow-y-auto p-5">
            <div className="flex flex-wrap gap-4 justify-between pb-10">
              {quizzes.length > 0 &&
                quizzes.map((quiz, index) => (
                  <QuizCard
                    key={index}
                    quiz={quiz}
                    index={index}
                    contextFieldOpen={contextFieldOpen}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          contextFieldOpen ? "w-1/2" : "w-[60px]"
        } h-full border-l-1 border-l-black relative transition-all duration-500`}
      >
        <span
          className="hover:bg-black transition-all duration-300 bg-neutral-500  absolute -left-4 top-30 bg rounded-full"
          onClick={() => {
            setContextFieldOpen(!contextFieldOpen);
          }}
        >
          {contextFieldOpen ? (
            <ChevronRight size={32} color="white" className="" />
          ) : (
            <ChevronLeft size={32} color="white" className="" />
          )}
        </span>
        <textarea
          value={generationSettings.context}
          onChange={(e) => changeContext(e)}
          placeholder="Enter your text context here..."
          className={`w-full h-full p-4 border-0 outline-0 focus:bg-accent ${
            contextFieldOpen ? "" : "whitespace-nowrap "
          }`}
        />
      </div>
    </div>
  );
}

export default QuizGenerationPage;
