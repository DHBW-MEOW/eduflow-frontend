import { fetchCourses } from "../api/fetchCourses";

export async function getCourseNames(): Promise<string[]> {
    try {
        const courseData = await fetchCourses();

        if (!Array.isArray(courseData)) {
            return [];
        }

        const courseNames: string[] = [];

        for (let i = 0; i < courseData.length; i++) {
            if (courseData[i] && typeof courseData[i].name === 'string') {
                courseNames.push(courseData[i].name);
            }
        }
    
        const uniqueCourseNames = Array.from(new Set(courseNames));

        return uniqueCourseNames;
        
    } catch (error) {
        return [];
    }
}