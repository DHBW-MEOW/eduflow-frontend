import type { ExamDateData } from "../types";
import { fetchFromBackend } from "../../../fetchBackend";

export const fetchExamData = async () => {
    try {
        const allExams: ExamDateData[] = await fetchFromBackend<{ id: number; date: string }[]>({
            method: "GET",
            endpoint: "data/exam",
        });

        return allExams;
        
    } catch (err) {
        console.error("Error while loading Data:", err);
    }
};