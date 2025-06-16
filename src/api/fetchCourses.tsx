import type { CourseData } from "../app/studyplan/types";
import { fetchFromBackend } from "../fetchBackend";

export const fetchCourses = async () => {
    try {
        const allCourses: CourseData[] = await fetchFromBackend<{ id: number; name: string }[]>({
            method: "GET",
            endpoint: "data/course",
        });

        return allCourses;
        
    } catch (err) {
        console.error("Error while loading Courses:", err);
        return [];
    }
};