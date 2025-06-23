import type { CourseData } from "../types";

export function getCourseNames(courses: CourseData[]): string[] {
    if (!Array.isArray(courses)) {
        console.error("Error: Expected an array for courses in getCourseNames.");
        return [];
    }

    const courseNames: string[] = [];

    for (let i = 0; i < courses.length; i++) {
        if (courses[i] && typeof courses[i].name === 'string') {
            courseNames.push(courses[i].name);
        }
    }

    const uniqueCourseNames = Array.from(new Set(courseNames));

    return uniqueCourseNames;
}