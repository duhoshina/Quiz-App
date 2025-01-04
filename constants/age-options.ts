export const generateAgeOptions = (startAge: number, endAge: number) => {
  const ageOptions = [];
  
  for (let i = startAge; i <= endAge; i++) {
    ageOptions.push({
      value: String(i),
      option: String(i),
    });
  }
  
  return ageOptions;
};

export const ageOptions = generateAgeOptions(18, 25);