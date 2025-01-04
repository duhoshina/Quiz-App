import Questions from "@/components/questions";
import "./questions.css";
import { ageOptions } from "@/constants/age-options";
import { redirect } from "next/navigation";

export const fetchCache = "force-no-store";

type Props = {
  searchParams: {
    age: string;
    limit: string;
  };
};

async function getData(age: string, limit: string) {
  const ageValue = parseInt(age, 10);
  const limitValue = parseInt(limit, 10);

  if (isNaN(ageValue) || isNaN(limitValue)) {
    throw new Error("Invalid parameters: 'age' and 'limit' must be valid numbers.");
  };

  const res = await fetch(
    `http://localhost:3000/api/questions?age=${ageValue}&limit=${limitValue}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Error Details:", data);
    throw new Error(`Failed to fetch data: ${data.message || res.statusText}`);
  };

  return data;
}

const QuestionsPage = async ({ searchParams }: Props) => {
  const age = searchParams.age as string;
  const limit = searchParams.limit;

  const validateAge = (age: string) => {
    const validCategories = ageOptions.map((option) => option.value);
    return validCategories.includes(age);
  };

  const validateLimit = (limit: string) => {
    const parsedLimit = parseInt(limit, 10);
    return !isNaN(parsedLimit) && parsedLimit >= 5 && parsedLimit <= 50;
  };

  if (
    !validateAge(age) ||
    !validateLimit(limit)
  ) {
    return redirect("/");
  }

  const response = await getData(age, limit);

  return (
    <Questions
      questions={response.results}
      limit={response.results.length}
    />
  );
};

export default QuestionsPage;
