"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { alphabeticNumeral } from "@/constants";
import useModalStore from "@/hooks/useModalStore";
import useResultStore from "@/hooks/useResultStore";
import { Question, QuestionOptions } from "@/types/question";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { toast } from "sonner";

type Props = {
  questions: Question[];
  limit: number;
};

const Questions = ({ questions, limit }: Props) => {
  const [curr, setCurr] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [score, setScore] = useState(0);
  const { onOpen } = useModalStore();
  const { questionsAnswered, increaseQuestionAnswered, resetQuestionsAnswered } = useResultStore();
  const [key, setKey] = useState(0);

  const currentQuestion = questions[curr];
  const answers = currentQuestion?.options || [];

  const handleNext = () => {
    setCurr(curr + 1);
    setSelected(null);
    setKey(prevKey => prevKey + 1);
  };

  const handleQuit = () => {
    onOpen("quitQuiz");
    resetQuestionsAnswered();
  };

  const handleShowResult = () => {
    onOpen("showResults", { score, limit });
  };

  const handleTimeUp = () => {
    toast.error("Você pensou demais!");
  };

  const handleAnswerClick = (answerValue: string, index: number) => () => {
    setSelected(answerValue);
    updateScore(answerValue);
    if (answerValue) {
      increaseQuestionAnswered({
        question: {
          id: currentQuestion.id,
          question: currentQuestion.question,
        },
        userAnswer: answerValue as QuestionOptions["value"],
      });
    }
  };

  const updateScore = (answerValue: string) => {
    if (answerValue) {
      setScore(prevScore => prevScore + 1);
    };
  };

  useEffect(() => {
    if (currentQuestion) {
      setProgressValue((100 / limit) * (curr + 1));
    }
  }, [curr, limit, currentQuestion]);

  if (!questions.length) {
    return <Loader2 className="size-10 text-white animate-spin" />;
  }

  return (
    <div className="bg-white px-3 py-5 md:p-6 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl sm:rounded-lg">
      <Progress value={progressValue} />
      <div className="flex justify-between items-center h-20 text-sm md:text-base">
        <div className="space-y-1">
          <p>Respostas: {score}/{limit}</p>
        </div>
        <CountdownCircleTimer
          key={key}
          isPlaying={!selected}
          duration={25}
          size={45}
          strokeWidth={4}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[15, 20, 5, 0]}
          onComplete={handleTimeUp}
        >
          {({ remainingTime }) => <div className="text-center">{remainingTime}</div>}
        </CountdownCircleTimer>
      </div>
      <Separator />
      <div className="min-h-[50vh] py-4 xl:py-8 px-3 md:px-5 w-full">
        <h2 className="text-2xl text-center font-medium">
          {`Q${curr + 1}. ${currentQuestion?.question}`}
        </h2>
        <div className="py-4 md:py-5 xl:py-7 flex flex-col gap-y-3 md:gap-y-5">
          {answers.map((answer, i) => (
            <button
              key={i}
              className={`option ${selected === answer.value ? 'correct' : ''}`}
              disabled={!!selected}
              onClick={handleAnswerClick(answer.value, i)}
            >
              {alphabeticNumeral(i)} {answer.text}
            </button>
          ))}
        </div>
        <Separator />
        <div className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
          <Button
            disabled={!selected}
            onClick={() => (curr + 1 === questions.length ? handleShowResult() : handleNext())}
          >
            {curr + 1 < questions.length ? "Próxima Pergunta" : "Ver Resultado"}
          </Button>
          <Button variant="destructive" onClick={handleQuit}>
            Encerrar Teste
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
