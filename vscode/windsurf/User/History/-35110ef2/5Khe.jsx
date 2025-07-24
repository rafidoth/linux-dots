import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectList = ({ value, onValueChange, label, itemsList }) => {
  return (
    <div>
      <label>Question Type</label>
      <Select
        value={generationSettings.questionType}
        onValueChange={(value) => changeQuestionType(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
