import type { FetchFromBackendType } from "./createFetcher";

export const createNewStudyGoal = async (
  topic_id: number,
  deadline: string,
  fetchFromBackend: FetchFromBackendType,
) => {
  try {
    await fetchFromBackend<void>({
      method: "POST",
      endpoint: "data/study_goal",
      body: {
        id: null,
        topic_id: topic_id,
        deadline: deadline,
      },
    });
  } catch (err) {
    console.error("Error while creating new StudyGoal", err);
  }
};
