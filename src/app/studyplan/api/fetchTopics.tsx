import type { TopicData } from "../types";
import { fetchFromBackend } from "../../../fetchBackend";

export const fetchTopics = async () => {
    try {
        const allTopics: TopicData[] = await fetchFromBackend<{ id: number; course_id: number; name: string }[]>({
            method: "GET",
            endpoint: "data/topic",
        });

        return allTopics;
        
    } catch (err) {
        console.error("Error while loading Topics:", err);
        return [];
    }
};