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
import { useRouter } from "next/navigation";

const ResultModal = () => {
  const { isOpen, type, onClose, additionalData } = useModalStore();
  const open = isOpen && type === "showResults";
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl md:text-2xl">
            Resultado
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col items-center py-4 md:py-6">
          <p className="text-lg md:2xl text-primary font-semibold tracking-wide">
            Voce eh um soca fofo
          </p>
          <Button
            onClick={() => {
              router.push("/");
              onClose();
            }}
            className="mt-3 md:mt-5"
          >
            Conheca o desenvolvedor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
