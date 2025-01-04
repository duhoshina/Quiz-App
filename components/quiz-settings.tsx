"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ageOptions } from "@/constants/age-options";

const QuizSettings = () => {
  const router = useRouter();
  const [age, setCategory] = useState<string>("");
  const [limit, setLimit] = useState([5]);

  const handleQuizStart = () => {
    router.push(
      `/questions?age=${age}&limit=${limit[0]}`
    ); 
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
      <Select value={age} onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="w-full md:max-w-xs xl:max-w-md">
          <SelectValue placeholder="Selecione sua idade" />
        </SelectTrigger>
        <SelectContent>
          {ageOptions.map((age) => (
            <SelectItem value={age.value} key={age.value}>
              {age.option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm lg:text-sm font-semibold">
        Numero de Perguntas: {limit[0]}
      </p>
      <Slider
        value={limit}
        onValueChange={(value) => setLimit(value)}
        max={10}
        step={1}
        min={3}
        className="w-full md:max-w-xs xl:max-w-md"
      />
      <Button disabled={!age} onClick={handleQuizStart}>
        Comecar agora
      </Button>
    </div>
  );
};

export default QuizSettings;
