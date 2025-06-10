import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFromBackend } from "../../fetchBackend";
import type { BoxData } from "../../components/grid/Box";

function DetailPage() {
    const { moduleId, topicId } = useParams();
    const [details, setDetails] = useState<string>("");
    const [items, setItems] = useState<BoxData[]>([]);

    /*useEffect(() => {
        console.log(moduleId + "-" + topicId)
    fetchFromBackend<{ id: number; name: string; details: string }[]>({
        method: "GET",
        endpoint: `data/topic?id=${topicId}&course_id=${moduleId}`,
    })
    .then((data) => setItems(data))
    .catch((err) => console.error(err));
  }, [moduleId, topicId]);*/

  
  useEffect(() => {
    console.log(moduleId + "-" + topicId)
    fetchFromBackend<{ id: number; name: string; details: string }[]>({
      method: "GET",
      endpoint: `data/topic?id=${topicId}&course_id=${moduleId}`,
    })
      .then((data) => {
        if (data.length > 0) {
          setDetails(data[0].details);
        }
      })
      .catch((err) => console.error(err));
  }, [moduleId, topicId]);

  return (
    <div>
      <h2>Details zur Topic #{topicId}</h2>
      <p>Details: {details}</p>
    </div>
  );
}

export default DetailPage;