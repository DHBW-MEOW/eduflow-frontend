import type { TopicData } from "../types"

export const getTopicID = (course_id: number, name: string, topics: TopicData[]) => {
    for (let i=0; i < topics.length; i++) {
        if( course_id === topics[i].course_id && name === topics[i].name)
            return topics[i].id
    }

    return null;
}