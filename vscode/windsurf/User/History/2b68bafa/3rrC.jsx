import { useState } from "react";
import { fetchQuizset, generateQuestions, updateQuizsetTitle } from "../api";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import QuizCard from "./QuizCard";
import { Button } from "@/components/ui/button";
import SelectList from "@/src/components/SelectList";
import DialogBox from "../components/DialogBox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSession } from "../context/SessionContext";
import { useEffect } from "react";
import { useParams } from "react-router";
import ExamCreationDialog from "./ExamCreationDialog";
import { useNavigate } from "react-router";
import EditableTitle from "../components/EditableTitle";
import { toast } from "sonner";

function Quizset() {
  const quizsetId = useParams().quizsetId;
  const [quizsetTitle, setQuizsetTitle] = useState("Untitled");
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const [generationSettings, setGenerationSettings] = useState({
    questionType: "multiple-choice",
    questionCount: 20,
    instruction: "",
    context: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [contextFieldOpen, setContextFieldOpen] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const session = useSession();
  // console.log(session.user);
  const navigate = useNavigate();

  const changeInstruction = (e) => {
    setGenerationSettings({
      ...generationSettings,
      instruction: e.target.value,
    });
  };

  const changeContext = (context) => {
    setGenerationSettings({
      ...generationSettings,
      context: context,
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

  const handleTitleUpdate = async (newTitle) => {
    if (newTitle.trim() === quizsetTitle) return;

    setIsSavingTitle(true);
    try {
      if (session?.user?.id) {
        await updateQuizsetTitle(quizsetId, newTitle, session.user.id);

        const key = `quizset-${quizsetId}`;
        const cached = localStorage.getItem(key);
        if (cached) {
          const parsed = JSON.parse(cached);
          parsed.quizsetTitle = newTitle;
          localStorage.setItem(key, JSON.stringify(parsed));
        }

        setQuizsetTitle(newTitle);
        toast.success("Title updated successfully");
      }
    } catch (error) {
      console.error("Failed to update title:", error);
      toast.error("Failed to update title");
    } finally {
      setIsSavingTitle(false);
    }
  };

  const handleGenerate = async () => {
    if (!generationSettings.context.trim()) {
      toast.error("Please provide some context");
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

  useEffect(() => {
    if (quizsetId) {
      const key = `quizset-${quizsetId}`;
      const cached = localStorage.getItem(key);

      const fetchQuizzes = async () => {
        try {
          const response = await fetchQuizset(quizsetId, session.user.id);
          console.log(response);
          setQuizzes(response.quizzes);
          changeContext(response.context);
          setQuizsetTitle(response.quizsetTitle);
          localStorage.setItem(key, JSON.stringify(response));
        } catch (error) {
          console.error(error);
          navigate("/not-found");
        }
      };
      if (cached) {
        const parsed = JSON.parse(cached);
        // console.log("cached ", parsed);
        setQuizzes(parsed.quizzes);
        changeContext(parsed.context);
        setQuizsetTitle(parsed.quizsetTitle);
      } else {
        fetchQuizzes();
      }
    }
  }, [quizsetId]);

  return (
    <div className="h-full w-full flex  space-y-6">
      <div
        className={`${
          contextFieldOpen ? "w-1/2" : "w-full"
        } h-full transition-all duration-500 p-6`}
      >
        <div>
          <div className="flex items-center gap-2">
            <ExamCreationDialog
              quizsetId={quizsetId}
              quizsetTitle={quizsetTitle}
            />

            {isGenerating ? (
              <Button variant={"outline"} className={"cursor-not-allowed"}>
                <div>Generating...</div>
              </Button>
            ) : (
              <DialogBox
                title="Generate More"
                description="Tweak the settings to create questions just the way you like."
                onClose={{
                  title: "Generate More",
                  action: handleGenerate,
                }}
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
        <div
          className={`w-full h-full ${
            contextFieldOpen ? "" : "whitespace-nowrap "
          }
          `}
        >
          <div className="py-5 my-5 mx-5">
            <EditableTitle
              title={quizsetTitle}
              onSave={handleTitleUpdate}
              disabled={isSavingTitle}
            />
          </div>
          <textarea
            value={generationSettings.context}
            onChange={(e) => changeContext(e.target.value)}
            placeholder="Enter your text context here..."
            className={`w-full h-full p-4 border-0 outline-0 focus:bg-accent`}
          />
        </div>
      </div>
    </div>
  );
}

export default Quizset;
