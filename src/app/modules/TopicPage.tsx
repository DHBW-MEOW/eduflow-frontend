import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../components/grid/Grid";
import { fetchFromBackend } from "../../fetchBackend";
import type { BoxData } from "../../components/grid/Box";
import type { DetailData } from "./DetailExamPage";

function TopicPage(): JSX.Element {
    const { moduleId } = useParams<{ moduleId: string }>();
    const navigate = useNavigate();
    const [ topics, setTopics] = useState<BoxData[]>([]);
    const [ exams, setExams] = useState<BoxData[]>([]);
    const [ examsInfo, setExamsInfo] = useState<DetailData[]>([]);
    
    const handleRenameExam = async (id: number, newTitle: string) => {
        const item = examsInfo.find(item => item.id === id);
        if (!item) {
            console.error(`No Exam found with ID=${id}`);
            return;
        }
        try {
            await fetchFromBackend<void>({
                method: "POST",
                endpoint: "data/exam",
                body: {
                  id: id,
                  course_id: Number(moduleId),
                  name: newTitle,
                  date: item.date
                },
            });
        } catch (err) {
            console.error("Error while renaming:", err);
        }
    };

    const handleDeleteExam = async (id: number) => {
        try {
            await fetchFromBackend<void>({
                method: "DELETE",
                endpoint: "data/exam",
                body: { id: id },
            });
        } catch (err) {
            console.error("Error while deleting:", err);
        }
    };  

    const handleClickExam = (id: number) => {
        if (!id) return;
        navigate(`/modules/${moduleId}/exams/${id}`);
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
            console.error("Error while renaming:", err);
        }
    };

    const handleDeleteTopic = async (id: number) => {
        try {
            const study_goals = await fetchFromBackend<{ id: number }[]>({
                method: "GET",
                endpoint: `data/study_goal?topic_id=${id}`,
            });
            for (const study_goal of study_goals) {
                await fetchFromBackend<void>({
                    method: "DELETE",
                    endpoint: "data/study_goal",
                    body: { id: study_goal.id },
                });
            };
            await fetchFromBackend<void>({
                method: "DELETE",
                endpoint: "data/topic",
                body: { id: id },
            });
        } catch (err) {
            console.error("Error while deleting:", err);
        }
    };  

    const handleClickTopic = (id: number) => {
        if (!id) return;
        navigate(`/modules/${moduleId}/topics/${id}`);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const [dataTopics, dataExams, dataExamsInfo] = await Promise.all([
                    fetchFromBackend<{ id: number; name: string; details: string }[]>({
                        method: "GET",
                        endpoint: `data/topic?course_id=${moduleId}`
                    }),
                    fetchFromBackend<{ id: number; name: string; details: string }[]>({
                        method: "GET",
                        endpoint: `data/exam?course_id=${moduleId}`
                    }),
                    fetchFromBackend<{ id: number; name: string; date: Date }[]>({
                        method: "GET",
                        endpoint: `data/exam?course_id=${moduleId}`
                    })
                ]);
                setTopics(dataTopics);
                setExams(dataExams);
                setExamsInfo(dataExamsInfo);
            } catch (err) {
                console.error("Error while loading the Topics and Exams:", err);
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
                onRename={handleRenameExam}
                onDelete={handleDeleteExam}
                onClick={handleClickExam}
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