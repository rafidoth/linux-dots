import { ChoiceType } from "./types";

export function getChoices(choices: ChoiceType[]): string[] {
  const c = choices.map((choice) => choice.choiceText);
  return c;
}

export function getCorrectAnswer(
  correctAnswer: string,
  choices: ChoiceType[]
): string {
  const idx: number = Number(correctAnswer);
  return choices[idx].choiceText;
}

export function getCorrectAnswerIdx(correctAnswer: string) {
  return Number(correctAnswer);
}
