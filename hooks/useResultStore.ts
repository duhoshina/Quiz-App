import { Question, QuestionOptions } from "@/types/question";
import { create } from "zustand";

export type AnsweredQuestion = {
  question: Pick<Question, 'id' | 'question'>;
  userAnswer: QuestionOptions["value"];
};

type CategoryCount = {
  gemeFino: number;
  empurraMole: number;
  erraBuraco: number;
  naoEscuto: number;
  gozaDorme: number;
};

const calculateCategory = (questionsAnswered: AnsweredQuestion[]): string => {
  const categoryCount: CategoryCount = {
    gemeFino: 0,
    empurraMole: 0,
    erraBuraco: 0,
    naoEscuto: 0,
    gozaDorme: 0
  };

  questionsAnswered.forEach((answeredQuestion) => {
    const userAnswer = answeredQuestion.userAnswer as keyof CategoryCount;
    if (userAnswer in categoryCount) {
      categoryCount[userAnswer] += 1;
    }
  });

  const maxCategory = Object.entries(categoryCount).reduce(
    (acc, [category, count]) =>
      count > acc.count ? { category, count } : acc,
    { category: "", count: 0 }
  );

  return maxCategory.category;
};

interface ResultStore {
  questionsAnswered: AnsweredQuestion[];
  increaseQuestionAnswered: (newAnsweredQuestion: AnsweredQuestion) => void;
  removeQuestionAnswered: (questionId: number) => void;
  resetQuestionsAnswered: () => void;
  getResultCategory: () => string;
}

const useResultStore = create<ResultStore>((set, get) => ({
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

  resetQuestionsAnswered: () => set({ questionsAnswered: [] }),

  getResultCategory: () => {
    const { questionsAnswered } = get();
    return calculateCategory(questionsAnswered);
  },
}));

export default useResultStore;
