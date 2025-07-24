import { useState } from "react";
import { InterviewAPI } from "../lib/api";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import { useRef } from "react";

export function formatUserMessage(message) {
  return {
    role: "user",
    content: message,
  };
}

export function formatOpenAIResponse(message) {
  return {
    role: "assistant",
    content: message,
  };
}

function getLineNumberAttachedCode(code) {
  const lines = code.split("\n");
  const codes = lines.map((line, index) => {
    return {
      [`line ${index + 1}`]: line,
    };
  });
  return JSON.stringify(codes);
}

const CodingInterviewBox = ({
  problemId,
  code,
  chatHistory,
  chatSocket,
  addUserMessageToChatHistory,
}) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const user_said = inputValue;
    addUserMessageToChatHistory(user_said);
    setInputValue("");
    chatSocket.emit("interviewer", user_said);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    messageInputRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col h-full w-full  overflow-hidden max-h-[calc(100vh-70px)] ">
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex mb-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-xl rounded-3xl px-4 py-2 ${
                message.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-300 p-3 bg-white">
        <div className="flex gap-2">
          <input
            ref={messageInputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodingInterviewBox;
