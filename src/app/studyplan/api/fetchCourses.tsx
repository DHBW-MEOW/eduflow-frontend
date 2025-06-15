import type { CourseData } from "../types";
import { fetchFromBackend } from "../../../fetchBackend";

export const fetchCourses = async () => {
    try {
        const allCourses: CourseData[] = await fetchFromBackend<{ id: number; name: string }[]>({
            method: "GET",
            endpoint: "data/exam",
        });

        return allCourses;
        
    } catch (err) {
        console.error("Error while loading Courses:", err);
    }
};