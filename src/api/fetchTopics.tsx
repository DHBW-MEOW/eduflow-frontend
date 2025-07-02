import type { TopicData } from "../app/studyplan/types";
import type { FetchFromBackendType } from "./createFetcher";

export const fetchTopics = async (fetchFromBackend: FetchFromBackendType) => {
  try {
    const allTopics: TopicData[] = await fetchFromBackend<
      { id: number; course_id: number; name: string }[]
    >({
      method: "GET",
      endpoint: "data/topic",
    });

    return allTopics;
  } catch (err) {
    console.error("Error while loading Topics:", err);
    return [];
  }
};
