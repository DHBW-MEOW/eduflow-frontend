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

function DetailPage() {
  const { moduleId, examId } = useParams();
  const [ date, setDate ] = useState<Date>();
  const [ name, setName ] = useState<string>("");
  
  useEffect(() => {
    fetchFromBackend<{ id: number; name: string; date: Date }[]>({
      method: "GET",
      endpoint: `data/exam?id=${examId}&course_id=${moduleId}`,
    })
      .then((data) => {
        if (data.length > 0) {
          setDate(data[0].date);
          setName(data[0].name);
        }else{
            console.log("ERRROR");
        }
      })
      .catch((err) => console.error(err));
  }, [moduleId, examId]);

  return (
    <div>
      <h2>Details zur Exam {name}</h2>
      <p>Datum: {date?.getDate()}</p>
    </div>
  );
}

export default DetailPage;
