import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFromBackend } from "../../fetchBackend";
import { Detail, type DetailBaseData } from "../../components/grid/Detail";

function DetailExamPage() {
  const { moduleId, examId } = useParams();
  const [ exam, setExam] = useState<DetailBaseData<Date>>();
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
            console.log("No Exam was found");
          }
        } catch (err) {
          console.error("Error while loading the Exam:", err);
        }
      };    
    loadData();
  }, [moduleId, examId]);

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