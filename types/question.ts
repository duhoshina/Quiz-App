export type QuestionOptions = {
  id: number,
  text: string,
  value: "gemeFino" | "empurraMole" | "erraBuraco" | "bateFraco" | "enforcaErrado" | "gozaDorme"
};

export type Question = {
  id: number,
  question: string,
  options: QuestionOptions[];
};