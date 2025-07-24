import React from "react";
import CodeEditorNew from "../components/CodeEditorNew";
import { useEffect } from "react";
import { useState } from "react";
import { InterviewAPI } from "../lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import CodingProblemBox from "../components/CodingProblemBox";
import CodingInterviewBox from "../components/CodingInterviewBox";
import { io } from "socket.io-client";

const CodingProblemPage = ({ problemId }) => {
  const [problemStates, setProblemStates] = useState({
    problemId,
    problem: null,
    CodeEditor: {
      code: "",
      language: "javascript",
    },
    code: "",
  });
  const [chatHistory, setChatHistory] = useState([]);
  const { toast } = useToast();
  const [viewProblem, setViewProblem] = useState(false);

  const handleSetProblem = (problem) => {
    setProblemStates((prev) => {
      return {
        ...prev,
        problem,
      };
    });
  };
  const addInterviewerResponseToChatHistory = (message) => {
    setChatHistory((prev) => [...prev, formatOpenAIResponse(message)]);
  };

  useEffect(() => {
    const socket = io("http://localhost:3001");
    installSocketHandlers(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await InterviewAPI.getCodingProblem(problemId);
        console.log(response);
        handleSetProblem(response);
      } catch (error) {
        console.error("Error fetching problem:", error);
        toast({
          title: "Error",
          description: "Failed to load problem data",
          variant: "destructive",
        });
      }
    };

    fetchProblem();
  }, [problemId]);

  const viewTheProblem = () => {
    setViewProblem((prev) => !prev);
  };
  const handleCodeChangeInEditor = (new_code, editor) => {
    setProblemStates((prev) => {
      return {
        ...prev,
        CodeEditor: {
          ...prev.CodeEditor,
          code: new_code,
        },
      };
    });
  };

  const handleLanguageChangeInEditor = (new_language) => {
    setProblemStates((prev) => {
      return {
        ...prev,
        CodeEditor: {
          ...prev.CodeEditor,
          language: new_language,
        },
      };
    });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="h-[70px] border-b p-4">
        <Button onClick={viewTheProblem}>
          {viewProblem ? "Hide Problem" : "View Problem"}
        </Button>
      </div>
      <div className="flex flex-1">
        <div className="border-r border-t w-1/2">
          <CodeEditorNew
            code={problemStates.code}
            language={problemStates.CodeEditor.language}
            onCodeChange={handleCodeChangeInEditor}
            onLanguageChange={handleLanguageChangeInEditor}
          />
        </div>
        <div className=""></div>
        <div className="border-l border-t w-1/2 p-0 h-full overflow-hidden">
          {viewProblem && problemStates.problem && (
            <CodingProblemBox problem={problemStates.problem} />
          )}
          {!viewProblem && problemStates.problem && (
            <CodingInterviewBox
              problemId={problemId}
              code={problemStates.CodeEditor.code}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CodingProblemPage;

const installSocketHandlers = (socket) => {
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("message", (message) => {
    console.log("Received message:", message);
  });
};
