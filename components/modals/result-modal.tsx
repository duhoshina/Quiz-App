"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useModalStore from "@/hooks/useModalStore";
import useResultStore from "@/hooks/useResultStore";
import { QuestionOptions } from "@/types/question";
import { useRouter } from "next/navigation";
import { LuUserRoundCheck } from "react-icons/lu";
import { SiBuymeacoffee } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";

type ResultCategory = QuestionOptions['value'];

const descriptions: Record<ResultCategory, { title: string; description: string; icon: JSX.Element }> = {
  gemeFino: {
    title: "Geme Fino",
    description:
      "Você tende a ser sensível e expressivo, demonstrando suas emoções de forma intensa, seja na alegria ou na frustração. Você gosta de se conectar profundamente com as pessoas e não tem medo de mostrar suas vulnerabilidades. No entanto, às vezes, pode se sentir excessivamente emotivo ou inseguro em situações de pressão.",
    icon: <LuUserRoundCheck className="text-yellow-500" />,
  },
  empurraMole: {
    title: "Empurra Mole",
    description:
      "Você pode se sentir inseguro ou hesitante diante de desafios, muitas vezes tentando manter a calma, mas sem muito sucesso. Sua abordagem pode ser vista como passiva, mas é uma forma de lidar com o estresse sem confrontos diretos.",
    icon: <LuUserRoundCheck className="text-blue-500" />,
  },
  erraBuraco: {
    title: "Erra Buraco",
    description:
      "Você tem uma abordagem mais cautelosa e, por vezes, pode se sentir perdido ou inseguro em situações difíceis. Sua forma de lidar com problemas pode ser mais reflexiva, o que pode levar a decisões mais cuidadosas, mas por vezes você tende a se afastar quando as coisas ficam complicadas demais.",
    icon: <LuUserRoundCheck className="text-red-500" />,
  },
  bateFraco: {
    title: "Bate Fraco",
    description:
      "Você é alguém que tenta, mas muitas vezes sente que suas tentativas não têm o impacto desejado. Sua abordagem é mais focada em manter a calma e, quando as dificuldades surgem, você prefere seguir em frente com paciência e dedicação.",
    icon: <LuUserRoundCheck className="text-green-500" />,
  },
  enforcaErrado: {
    title: "Enforca Errado",
    description:
      "Você tende a ser alguém que, quando sob pressão, pode acabar exagerando ou tomando decisões precipitadas. Sua reação à adversidade pode ser um tanto impulsiva, muitas vezes não avaliando todas as possibilidades antes de agir.",
    icon: <LuUserRoundCheck className="text-purple-500" />,
  },
  gozaDorme: {
    title: "Goza e Dorme",
    description:
      "Você tende a ser descontraído e sabe como aproveitar os momentos de lazer, sem se preocupar demais com as pressões da vida. Você busca equilíbrio entre o trabalho e o descanso, e não tem problema em tirar uma pausa quando precisa.",
    icon: <LuUserRoundCheck className="text-pink-500" />,
  },
};

const ResultModal = () => {
  const { isOpen, type, onClose } = useModalStore();
  const open = isOpen && type === "showResults";
  const router = useRouter();
  const { getResultCategory } = useResultStore();

  const resultCategory = getResultCategory();

  const resultDescription =
    descriptions[resultCategory as ResultCategory] ||
    { title: "Resultado Desconhecido", description: "Não foi possível determinar o seu resultado. Tente novamente.", icon: <LuUserRoundCheck className="text-gray-500" /> };

  const shareMessage = encodeURIComponent(
    `Eu sou ${resultDescription.title} e quero saber qual é o seu!. Confira: https://tipodehomem.vercel.app/?utm_source=whatsapp&utm_medium=share&utm_campaign=resultados`
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl md:text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            {resultDescription.icon}
            {resultDescription.title}
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="py-4 md:py-6">
          <p className="text-sm text-gray-700 md:text-base leading-relaxed">
            {resultDescription.description}
          </p>
        </div>
        <div className="flex flex-col items-center py-6 md:py-8 gap-4">
          <a
            href={`https://wa.me/?text=${shareMessage}`}
            target="_blank"
            className="flex items-center justify-center gap-3 bg-green-500 text-white rounded-lg px-8 py-4 w-full md:w-auto transition duration-300 transform hover:scale-105 hover:bg-green-600 shadow-lg"
          >
            <FaWhatsapp className="text-xl" />
            <span className="text-lg font-medium">Compartilhar no WhatsApp</span>
          </a>

          <Button
            onClick={() => {
              router.push("/");
              onClose();
            }}
            className="flex items-center justify-center gap-3 bg-blue-500 text-white rounded-lg px-4 py-2 w-auto transition duration-300 transform hover:scale-105 hover:bg-blue-600 shadow-md"
          >
            <SiBuymeacoffee className="text-xl" />
            <span className="text-sm font-medium">Me pague um café ☕</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
