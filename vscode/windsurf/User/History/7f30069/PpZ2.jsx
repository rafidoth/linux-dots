import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

function QuizGenerationFront() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative w-full border rounded-lg shadow-sm">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Paste your text here and press Enter..."
            className="pr-24 py-6 text-base rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
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
