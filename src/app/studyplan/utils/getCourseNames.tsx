import type { CourseData } from "../types";

export function getCourseNames(coursesArray: CourseData[]): string[] {
    if (!Array.isArray(coursesArray)) {
        console.error("Error: Expected an array for coursesArray in getCourseNames.");
        return [];
    }

    const courseNames: string[] = [];

    for (let i = 0; i < coursesArray.length; i++) {
        if (coursesArray[i] && typeof coursesArray[i].name === 'string') {
            courseNames.push(coursesArray[i].name);
        }
    }

    const uniqueCourseNames = Array.from(new Set(courseNames));

    return uniqueCourseNames;
}