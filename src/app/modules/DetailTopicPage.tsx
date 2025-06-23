import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFromBackend } from "../../fetchBackend";
import { Detail, type DetailBaseData } from "../../components/grid/Detail";

function DetailTopicPage() {
  const navigate = useNavigate();
  const { moduleId, topicId } = useParams();
  const [ topic, setTopic] = useState<DetailBaseData<string>>();
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFromBackend<{ id: number; name: string; details: string }[]>({
          method: "GET",
          endpoint: `data/topic?id=${topicId}&course_id=${moduleId}`,
        })
        if (data.length > 0) {
          setTopic({
            id: data[0].id,
            name: data[0].name,
            value: data[0].details,
          });
        }else{
          navigate("/404", { replace: true });
          return;
        }
      } catch (err) {
        console.error("Error while loading the Topic:", err);
      }
    };    
    loadData();
  }, [moduleId, topicId]);

  const handleEdit = async (updated: DetailBaseData) => {
      try {
        await fetchFromBackend<void>({
          method: "POST",
          endpoint: "data/topic",
          body: {
            id: updated.id,
            course_id: Number(moduleId),
            name: updated.name,
            details: updated.value
          },
        });
        setTopic(updated);
      } catch (err) {
        console.error("Error while renaming:", err);
      }
  };

  return (
    <div>
      {topic && (
          <Detail<DetailBaseData<string>>
            data={topic}
            onEdit={handleEdit}
          />
        )
      }
    </div>
  );
}

export default DetailTopicPage;