export const validateModul = (input: string) => {
  let newErrors: string | undefined = undefined;

  if (!input.trim()) {
    newErrors = "Das Modul darf nicht leer sein.";
  }

  return newErrors;
};
