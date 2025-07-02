export const validateTitle = (input: string) => {
  let newErrors: string | undefined = undefined;

  if (!input.trim()) {
    newErrors = "Der Titel darf nicht leer sein.";
  }

  return newErrors;
};
