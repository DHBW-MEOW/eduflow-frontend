import { fetchFromBackend } from "../fetchBackend";

export const createNewExam = async (course_id: number , name: string, date: string) => {
    try {
            await fetchFromBackend<void>({
                method: "POST",
                endpoint: "data/exam",
                body: {
                  id: null,
                  course_id: course_id,
                  name: name,
                  date: date
                },
            });
        } catch (err) {
            console.error("Error while creating new Exam", err);
        }
}