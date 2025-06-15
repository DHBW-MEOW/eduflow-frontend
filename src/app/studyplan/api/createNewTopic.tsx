import { fetchFromBackend } from "../../../fetchBackend";

export const createNewTopic = async (course_id: number, name: string, details: string) => {
    try {
            await fetchFromBackend<void>({
                method: "POST",
                endpoint: "data/topic",
                body: {
                  id: null,
                  course_id: course_id,
                  name: name,
                  details: details
                },
            });
            console.log('Create new Topic');
        } catch (err) {
            console.error("Error while creating new Topic", err);
        }
}