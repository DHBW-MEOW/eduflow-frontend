import type { ExamDateData } from "../app/studyplan/types";
import type { FetchFromBackendType } from "./createFetcher";

export const fetchExamData = async (fetchFromBackend: FetchFromBackendType) => {
  try {
    const allExams: ExamDateData[] = await fetchFromBackend<
      { id: number; date: string }[]
    >({
      method: "GET",
      endpoint: "data/exam",
    });

    return allExams;
  } catch (err) {
    console.error("Error while loading Data:", err);
  }
};
