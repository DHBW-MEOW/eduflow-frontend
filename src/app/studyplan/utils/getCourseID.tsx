import type { CourseData } from "../types";

export const getCourseID = (name: string, courses: CourseData[]) => {
  for (let i = 0; i < courses.length; i++) {
    if (name === courses[i].name) return courses[i].id;
  }

  return null;
};
