import { ChoiceType } from "./types";

export function getChoices(choices: ChoiceType[]): string[] {
  const c = choices.map((choice) => choice.choiceText);
  return c;
}

export function getCorrectAnswerIndex(
  correctAnswer: string,
  choices: ChoiceType[]
): string {
  const idx: number = Number(correctAnswer);
  return choices[idx].choiceText;
}
