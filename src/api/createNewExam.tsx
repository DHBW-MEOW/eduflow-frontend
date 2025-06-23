import type { FetchFromBackendType } from "./createFetcher";

export const createNewExam = async (course_id: number , name: string, date: string, fetchFromBackend: FetchFromBackendType) => {
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