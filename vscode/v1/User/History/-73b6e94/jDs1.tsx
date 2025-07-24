import React from "react";

type Props = {};

function ParticipantView({}: Props) {
  const [quizzes, setQuizzes] = useState<SingleQuizInTest[]>([]);
  return <div>ParticipantView</div>;
}

export default ParticipantView;
