import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../components/grid/Grid";
import { fetchFromBackend } from "../../fetchBackend";
import type { BoxData } from "../../components/grid/Box";

function TopicPage(): JSX.Element {
    const { moduleId } = useParams<{ moduleId: string }>();
    const navigate = useNavigate();
    const [ topics, setTopics] = useState<BoxData[]>([]);
    const [ exams, setExams] = useState<BoxData[]>([]);
   
    const addItem = (newElement: BoxData) => {
        setTopics(oldItems => [...oldItems, newElement]);
    };

    const handleRenameTopic = async (id: number, newTitle: string) => {
        const item = topics.find(item => item.id === id);
        if (!item) {
            console.error(`No Topic found with ID=${id}`);
            return;
        }
        try {
            await fetchFromBackend<void>({
                method: "POST",
                endpoint: "data/topic",
                body: {
                  id: id,
                  course_id: Number(moduleId),
                  name: newTitle,
                  details: item.details
                },
            });
        } catch (err) {
            console.error("Fehler beim Umbenennen:", err);
        }
        console.log(`Rename: ID=${id}, Neuer Titel=${newTitle}, Details=${item.details}`);
    };

    const handleDeleteTopic = async (id: number) => {
        try {
            await fetchFromBackend<void>({
                method: "DELETE",
                endpoint: "data/topic",
                body: { id: id },
            });
        } catch (err) {
            console.error("Fehler beim Löschen:", err);
        }
        console.log(`Delete: ID=${id}`);
    };  

    const handleClickTopic = (id: number) => {
        if (!id) return;
        navigate(`/modules/${moduleId}/topics/${id}`);
        console.log(`Clicked: ID=${id}`);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const dataTopic = await fetchFromBackend<{ id: number; name: string; details: string }[]>({
                    method: "GET",
                    endpoint: `data/topic?course_id=${moduleId}`
                });
                setTopics(dataTopic);
                const dataExams = await fetchFromBackend<{ id: number; name: string; details: string }[]>({
                    method: "GET",
                    endpoint: `data/exam?course_id=${moduleId}`
                });
                setExams(dataExams);
            } catch (err) {
                console.error("Fehler beim Laden der Kurse:", err);
            }
        };    
      loadData();
    }, []);

    return (
        <div>
            <h2>Exams</h2>
            <Grid
                items={exams}
                setItems={setExams}
                onRename={handleRenameTopic}
                onDelete={handleDeleteTopic}
                onClick={handleClickTopic}
            />
            <h2>Topics</h2>
            <Grid
                items={topics}
                setItems={setTopics}
                onRename={handleRenameTopic}
                onDelete={handleDeleteTopic}
                onClick={handleClickTopic}
            />
        </div>
    );
}

export default TopicPage;