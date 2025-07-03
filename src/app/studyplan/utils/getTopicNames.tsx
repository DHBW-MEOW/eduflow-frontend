import type { TopicData } from "../types";

export function getTopicNames(topics: TopicData[]): string[] {
  if (!Array.isArray(topics)) {
    console.error("Error: Expected an array for topics in getTopicNames.");
    return [];
  }

  const courseNames: string[] = [];

  for (let i = 0; i < topics.length; i++) {
    if (topics[i] && typeof topics[i].name === "string") {
      courseNames.push(topics[i].name);
    }
  }

  const uniqueTopicNames = Array.from(new Set(courseNames));

  return uniqueTopicNames;
}
