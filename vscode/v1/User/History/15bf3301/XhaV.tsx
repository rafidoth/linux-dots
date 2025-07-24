import LargeTextInputField from "@/app/components/LargeTextInputField";

interface InputSectionProps {
  content: string;
  setContent: (content: string) => void;
}

export default function InputSection({
  content,
  setContent,
}: InputSectionProps) {
  return <LargeTextInputField text={content} setText={setContent} />;
}
