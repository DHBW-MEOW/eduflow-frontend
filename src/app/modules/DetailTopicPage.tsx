import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "../../app/AuthContext";
import { Detail, type DetailBaseData } from "../../components/grid/Detail";

import HeaderContext from "../../app/HeaderContext";

function DetailTopicPage() {
  const navigate = useNavigate();
  const { moduleId, topicId } = useParams();
  const [ topic, setTopic] = useState<DetailBaseData<string>>();

  const { fetchFromBackend } = useAuth();
  const headerSetter = useContext(HeaderContext);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFromBackend<{ id: number; name: string; details: string }[]>({
          method: "GET",
          endpoint: `data/topic?id=${topicId}&course_id=${moduleId}`,
        })
        if(data.length===1 && typeof data[0] === "string"){
            console.log("Fetch wasnt allwed detected")
            return;
        }
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
    const setHeader = async () => {
      try {
        const modulData = await fetchFromBackend({
          method: "GET",
          endpoint: `data/course?id=${moduleId}`
        }) as { id: number; name: string }[];
        if (modulData.length === 0) {
            navigate("/404", { replace: true });
            return;
        }
        headerSetter?.setTextState(modulData[0].name);
        headerSetter?.setLeftButtonState({on: true, text: "", icon: "circle-arrow-left-solid.svg", link: `/modules/${moduleId}`});
      } catch (err) {
          console.error("Error while loading the Modul for header:", err);
      }
    }
    loadData();
    setHeader();
  }, [moduleId, topicId, fetchFromBackend]);

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