import ResizablePanelGen from '@/app/components/ResizablePanelGen'
import React from 'react'

type Props = {}

function TextPromptPage({}: Props) {
  const [content, setContent] = useState<string>("");
  const [fetchedQuizes, setFetchedQuizes] = useState<QuizType[]>([]);
  const [quizCount, setQuizCount] = useState<number>(0);
  const [generating, setGenerating] = useState<boolean>(false);
  return (
    <ResizablePanelGen/>
  )
}

export default TextPromptPage