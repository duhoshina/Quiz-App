export type QuestionOptions = {
  id: number,
  text: string,
  value: string
};

export type Question = {
  id: number,
  question: string,
  options: QuestionOptions[];
};