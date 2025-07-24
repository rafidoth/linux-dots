import { useState } from "react";
import MyBtn from "../components/MyBtn";
import { EyeIcon } from "lucide-react";
import { EyeClosedIcon } from "lucide-react";
import { Edit } from "lucide-react";
import { PencilLine } from "lucide-react";
import { Navigation } from "lucide-react";
import { TextSearch } from "lucide-react";
import { Dot } from "lucide-react";
import { Trash } from "lucide-react";

function resolveQuizCardChoiceStyle(selected, answer, index) {
  if (selected === index && answer === index) {
    return "bg-green-700/20 text-green-900 font-bold";
  } else if (selected === index && answer !== index) {
    return "bg-red-700/20 text-red-800 font-bold";
  } else {
    return "hover:bg-blue-700/20";
  }
}

const QuizCard = ({ quiz, index, contextFieldOpen }) => {
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [editing, setEditing] = useState(false);
  return (
    <div
      key={index}
      className={`${
        contextFieldOpen ? "w-[400px]" : "w-[500px]"
      } break-inside-avoid p-6 shadow-md inset-shadow-2xs border border-gray-500/30    mb-4 rounded-3xl`}
    >
      <div className="font-semibold flex items-center gap-2 ">
        {" "}
        <span className="w-3 h-3 rounded-full bg-black"></span>{" "}
        <span>Question No. {index + 1}</span>
      </div>
      <div className="text-xl my-4 font-semibold">{quiz.question}</div>
      <div className="flex flex-col gap-3">
        {quiz.choices.map((choice, i) => (
          <div
            key={i}
            className={`flex items-center gap-2  p-2 rounded-xl cursor-pointer 
                ${resolveQuizCardChoiceStyle(selected, quiz.answer, i)}`}
            onClick={() => setSelected(i)}
          >
            <div
              className={`w-6 h-6 min-w-[1.5rem] min-h-[1.5rem]  text-white  flex items-center justify-center  font-bold  rounded-sm
                ${
                  selected === i && quiz.answer === i
                    ? "bg-green-800 text-white font-bold"
                    : "bg-gray-500"
                }
                ${
                  selected === i && quiz.answer !== i
                    ? "bg-red-700 text-white font-bold"
                    : "bg-gray-500"
                }`}
            >
              {["A", "B", "C", "D"][i]}
            </div>{" "}
            {choice}
          </div>
        ))}
      </div>

      {showAnswer && (
        <span className=" mt-4 flex items-center gap-2  p-2 rounded-xl transition-all duration-300">
          <div className="bg-blue-700 text-white w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] flex items-center justify-center font-bold  rounded-sm">
            {" "}
            {["A", "B", "C", "D"][quiz.answer]}
          </div>{" "}
          <span className="whitespace-nowrap overflow-hidden text-ellipsis text-blue-700 font-bold">
            {quiz.choices[quiz.answer]}
          </span>
        </span>
      )}
      {showAnswer && (
        <div className="text-md mb-4">{quiz.answerExplanation}</div>
      )}
      <div className="flex items-center gap-2 mt-3 justify-evenly">
        <MyBtn
          className={`bg-gray-800 text-white rounded-sm m w-42 h-6 hover:bg-gray-700/90`}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}{" "}
          {showAnswer ? <EyeClosedIcon /> : <EyeIcon />}
        </MyBtn>
        <MyBtn
          className={`bg-gray-800 text-white rounded-sm m w-42 h-6 hover:bg-gray-700/90`}
        >
          Trace Answer <TextSearch />
        </MyBtn>
      </div>

      <div className="flex items-center gap-2 mt-3 justify-evenly">
        <MyBtn
          className={`bg-gray-800 text-white rounded-sm m w-42 h-6 hover:bg-gray-700/90`}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          Edit <PencilLine size={18} />
        </MyBtn>
        <MyBtn
          className={`bg-gray-800 text-white rounded-sm m w-42 h-6 hover:bg-gray-700/90`}
        >
          Delete <Trash size={18} />
        </MyBtn>
      </div>
    </div>
  );
};

export default QuizCard;
