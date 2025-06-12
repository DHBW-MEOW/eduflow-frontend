import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFromBackend } from "../../fetchBackend";

function DetailTopicPage() {
  const { moduleId, topicId } = useParams();
  const [ details, setDetails ] = useState<string>("");
  const [ name, setName ] = useState<string>("");
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFromBackend<{ id: number; name: string; details: string }[]>({
          method: "GET",
          endpoint: `data/topic?id=${topicId}&course_id=${moduleId}`,
        })
        if (data.length > 0) {
          setDetails(data[0].details);
          setName(data[0].name);
        }else{
          console.log("No Topic was found");
        }
      } catch (err) {
        console.error("Error while loading the Topic:", err);
      }
    };    
    loadData();
  }, [moduleId, topicId]);

  return (
    <div>
      <h2>Details zur Topic {name}</h2>
      <p>Details: {details}</p>
    </div>
  );
}

export default DetailTopicPage;