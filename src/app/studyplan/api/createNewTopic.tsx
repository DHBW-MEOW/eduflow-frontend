import { fetchFromBackend } from "../../../fetchBackend";

interface NewTopicResponse {
    id: number;
}

export const createNewTopic = async (course_id: number, name: string, details: string): Promise<number> => {
    try {
            const response = await fetchFromBackend<NewTopicResponse>({
                method: "POST",
                endpoint: "data/topic",
                body: {
                  id: null,
                  course_id: course_id,
                  name: name,
                  details: details
                },
            });

            if (typeof response.id === 'number') {
                return response.id;
            } else {
                throw new Error("No valid output from backend");
            }

        } catch (err) {
            console.error("Error while creating new Topic", err);
            throw err;
        }
}