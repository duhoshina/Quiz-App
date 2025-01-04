export const getDomain = () => {
  const env = process.env.NODE_ENV;

  if (env === "development") {
    return "http://localhost:3000";
  } else if (env === "production") {
    return "https://tipodehomem.vercel.app";
  } else {
    throw new Error("Ambiente desconhecido");
  }
};
