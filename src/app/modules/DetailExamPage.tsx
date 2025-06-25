import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../app/AuthContext";
import { Detail, type DetailBaseData } from "../../components/grid/Detail";

import HeaderContext from "../../app/HeaderContext";

function DetailExamPage() {
  const navigate = useNavigate();
  const { moduleId, examId } = useParams();
  const [ exam, setExam] = useState<DetailBaseData<Date>>();

  const { fetchFromBackend } = useAuth();

  useEffect(() => {
    const loadData = async () => {
        try {
          const data = await fetchFromBackend<{ id: number; name: string; date: Date }[]>({
            method: "GET",
            endpoint: `data/exam?id=${examId}&course_id=${moduleId}`,
          })
          if (data.length > 0) {
            setExam({
              id: data[0].id,
              name: data[0].name,
              value: data[0].date,
            });
          }else{
            navigate("/404", { replace: true });
            return;
          }
        } catch (err) {
          console.error("Error while loading the Exam:", err);
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
  }, [moduleId, examId, fetchFromBackend]);

  const handleEdit = async (updated: DetailBaseData) => {
      try {
        await fetchFromBackend<void>({
          method: "POST",
          endpoint: "data/exam",
          body: {
            id: updated.id,
            course_id: Number(moduleId),
            name: updated.name,
            date: updated.value
          },
        });
        setExam(updated);
      } catch (err) {
        console.error("Error while renaming:", err);
      }
  };

  return (
    <div>
      {exam && (
          <Detail<DetailBaseData<Date>>
            data={exam}
            onEdit={handleEdit}
            editable={false}
          />
        )
      }
    </div>
  );
}

export default DetailExamPage;