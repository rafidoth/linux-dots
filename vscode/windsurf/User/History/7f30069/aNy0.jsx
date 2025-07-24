import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function QuizGenerationFront() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [generationSettings, setGenerationSettings] = useState({
    questionType: "multiple-choice",
    questionCount: 20,
    instruction: "",
    context: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Type options for generation
  const generationOptions = [
    {
      id: "text",
      label: "Text",
      icon: "📝",
      description: "Generate from text input",
    },
    {
      id: "pdf",
      label: "PDF",
      icon: "📄",
      description: "Upload and generate from PDF",
    },
    {
      id: "link",
      label: "Website",
      icon: "🔗",
      description: "Generate from web URL",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);

    try {
      // For now, just navigate to text-based generation with the input as a parameter
      navigate(`/q/new?context=${encodeURIComponent(inputValue)}`);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const handleOptionClick = (optionId) => {
    if (optionId === "text") {
      // Focus on the input field
      inputRef.current?.focus();
    } else {
      // For future implementation of PDF and website options
      alert(`${optionId} generation option coming soon!`);
    }
  };
  const handleGenerate = async () => {
    if (!generationSettings.context.trim()) {
      // TODO: Show toast
      return;
    }

    if (generationSettings.context.trim().length > 10) {
      setIsGenerating(true);
      if (session?.user) {
        const response = await generateQuestions({
          userId: session.user.id,
          quantity: generationSettings.questionCount,
          knowledge: generationSettings.context,
          instructions: generationSettings.instruction,
          questionType: generationSettings.questionType,
        });
        console.log("response ", response);
        setQuizzes(response);
      } else {
        // TODO: Show toast and naviagate to login
      }
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Generate Quiz</h1>
      <p className="text-gray-500 mb-8 text-center">
        Enter your content or choose an option below to generate customized quiz
        questions
      </p>

      {/* Generation options */}
      <div className="flex gap-4 mb-6 w-full justify-center">
        {generationOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className="flex flex-col items-center py-6 px-4 h-auto w-[110px]"
            onClick={() => handleOptionClick(option.id)}
          >
            <span className="text-2xl mb-2">{option.icon}</span>
            <span className="font-medium">{option.label}</span>
            <span className="text-xs text-gray-500 mt-1 text-center">
              {option.description}
            </span>
          </Button>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="w-full h-[300px] relative">
        <div className="w-full h-full relative border rounded-lg shadow-sm">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Paste your text here..."
            className="w-full h-full p-4 border-0 outline-0 focus:bg-accent rounded-lg resize-none"
            disabled={isLoading}
          />

          {!isLoading ? (
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
          <Button
            type="submit"
            className="absolute bottom-4 right-4"
            disabled={!inputValue.trim() || isLoading}
          >
            {isLoading ? "Processing..." : "Generate"}
          </Button>
        </div>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        Press Enter to generate quiz questions from your text
      </div>
    </div>
  );
}

export default QuizGenerationFront;
