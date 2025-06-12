export function formatDate(date: string)  {
    const dateString = String(date);
    const splittedDate = dateString.split('-');

    return `${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0]}`;
}