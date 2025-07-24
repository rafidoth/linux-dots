import ResizablePanelGen from '@/app/components/ResizablePanelGen'
import React from 'react'

type Props = {}

function TextPromptPage({}: Props) {
  const [content, setContent] = React.useState<string>("");
  const [fetchedQuizes, setFetchedQuizes] = React.useState<QuizType[]>([]);
  const [quizCount, setQuizCount] = React.useState<number>(0);
  const [generating, setGenerating] = React.useState<boolean>(false);
  return (
    <ResizablePanelGen
        gen={generating}
        
    />
  )
}

export default TextPromptPage