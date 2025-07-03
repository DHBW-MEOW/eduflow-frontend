export const validateTopic = (input: string) => {
  let newErrors: string | undefined = undefined;

  if (!input.trim()) {
    newErrors = "Das Thema darf nicht leer sein.";
  }

  return newErrors;
};
