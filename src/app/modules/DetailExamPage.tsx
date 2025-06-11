import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFromBackend } from "../../fetchBackend";

export type DetailData = {
  id: number;
  name: string;
  date: Date;
};

export type DetailProps = {
  data: DetailData;
  onRename: (id: number, newTitle: string) => void;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
};

function DetailExamPage() {
  const { moduleId, examId } = useParams();
  const [ date, setDate ] = useState<Date>();
  const [ name, setName ] = useState<string>("");
  
  useEffect(() => {
    const loadData = async () => {
        try {
          const data = await fetchFromBackend<{ id: number; name: string; date: Date }[]>({
            method: "GET",
            endpoint: `data/exam?id=${examId}&course_id=${moduleId}`,
          })
          if (data.length > 0) {
            setDate(data[0].date);
            setName(data[0].name);
          }else{
            console.log("No Exam was found");
          }
        } catch (err) {
          console.error("Error while loading the Exam:", err);
        }
      };    
    loadData();
  }, [moduleId, examId]);

  return (
    <div>
      <h2>Details zur Exam {name}</h2>
      <p>Datum: {date?.toString()}</p>
    </div>
  );
}

export default DetailExamPage;
