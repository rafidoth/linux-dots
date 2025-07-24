import LargeTextInputField from "@/app/components/LargeTextInputField";

export default function InputSection({
  content,
  setContent,
}: InputSectionProps) {
  return <LargeTextInputField text={content} setText={setContent} />;
}
