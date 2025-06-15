import { fetchFromBackend } from "../../../fetchBackend";

export const createNewStudyGoal = async (topic_id: number, deadline: string) => {
    try {
            await fetchFromBackend<void>({
                method: "POST",
                endpoint: "data/StudyGoal",
                body: {
                  id: null,
                  topic_id: topic_id,
                  deadline: deadline
                },
            });
            console.log('Create new StudyGoal');
        } catch (err) {
            console.error("Error while creating new StudyGoal", err);
        }
}