export const validateDate = (date: string) => {
    let newErrors: string | undefined = undefined;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    if (!date) {
        newErrors = 'Das Datum darf nicht leer sein.';
    } else if (isNaN(inputDate.getTime())) {
        newErrors = 'Ungültiges Datumsformat.';
    } else if (inputDate < today) {
        newErrors = 'Das Datum darf nicht in der Vergangenheit liegen.';
    }

    return newErrors;
  };