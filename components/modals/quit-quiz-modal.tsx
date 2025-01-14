"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useModalStore from "@/hooks/useModalStore";
import useResultStore from "@/hooks/useResultStore";
import { useRouter } from "next/navigation";

const QuitQuizModal = () => {
  const { isOpen, type, onClose } = useModalStore();
  const { resetQuestionsAnswered } = useResultStore();
  const open = isOpen && type === "quitQuiz";
  const router = useRouter();

  const handleQuit = () => {
    resetQuestionsAnswered();
    return router.push("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Voce tem absoluta certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Seu teste sera perdido.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="destructive" onClick={handleQuit}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuitQuizModal;
