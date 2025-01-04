import { Question } from "@/types/question";
import { create } from "zustand";

export type AnsweredQuestion = {
  question: Pick<Question, 'id' | 'question'>;
  userAnswer: string;
};

interface ResultStore {
  questionsAnswered: AnsweredQuestion[];
  increaseQuestionAnswered: (newAnsweredQuestion: AnsweredQuestion) => void;
  removeQuestionAnswered: (questionId: number) => void;
}

const useResultStore = create<ResultStore>((set) => ({
  questionsAnswered: [],
  
  increaseQuestionAnswered: (newAnsweredQuestion: AnsweredQuestion) =>
    set((state) => ({
      questionsAnswered: [...state.questionsAnswered, newAnsweredQuestion],
    })),
  
  removeQuestionAnswered: (questionId: number) =>
    set((state) => ({
      questionsAnswered: state.questionsAnswered.filter(
        (answeredQuestion) => answeredQuestion.question.id !== questionId
      ),
    })),
}));

export default useResultStore;
