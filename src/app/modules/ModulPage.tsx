import { useEffect, useState } from "react";
import { useAuth } from "../../app/AuthContext";
import { Grid } from "../../components/grid/Grid";
import type { BoxData } from "../../components/grid/Box";
import { useNavigate } from "react-router-dom";

function ModulPage() {
    const navigate = useNavigate();
    const [items, setItems] = useState<BoxData[]>([]);

    const { fetchFromBackend } = useAuth();

    const handleRename = async (id: number, newTitle: string) => {
        try {
            await fetchFromBackend<void>({
                method: "POST",
                endpoint: "data/course",
                body: {
                  id: id,
                  name: newTitle,
                },
            });
        } catch (err) {
            console.error("Error while renaming:", err);
        }
    };

    const deleteStudyGoals = async (topicId: number) => {
        const study_goals = await fetchFromBackend<{ id: number }[]>({
            method: "GET",
            endpoint: `data/study_goal?topic_id=${topicId}`,
        });
        await Promise.all(
            study_goals.map(goal =>
                fetchFromBackend<void>({
                    method: "DELETE",
                    endpoint: "data/study_goal",
                    body: { id: goal.id },
                })
            )
        );
    };

    const handleDelete = async (id: number) => {
        try {
            //Deleting Exams
            const exams = await fetchFromBackend<{ id: number }[]>({
                method: "GET",
                endpoint: `data/exam?course_id=${id}`
            });
            await Promise.all(
                exams.map(exam =>
                    fetchFromBackend<void>({
                        method: "DELETE",
                        endpoint: "data/exam",
                        body: { id: exam.id },
                    })
                )
            );
            //Deleting Topics with study_goals
            const topics = await fetchFromBackend<{ id: number }[]>({
                method: "GET",
                endpoint: `data/topic?course_id=${id}`,
            });
            for (const topic of topics) {
                await deleteStudyGoals(topic.id);
                await fetchFromBackend<void>({
                    method: "DELETE",
                    endpoint: "data/topic",
                    body: { id: topic.id },
              });
            }
            //Deleting Courses
            await fetchFromBackend<void>({
                method: "DELETE",
                endpoint: "data/course",
                body: { id: id },
            });
        } catch (err) {
            console.error("Error while deleting:", err);
        }
    };  

    const handleClick = (id: number) => {
        navigate(`/modules/${id}`);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchFromBackend<({ id: number; name: string; details: string }| string)[]>({
                    method: "GET",
                    endpoint: "data/course",
                });
                if(data.length===1 && typeof data[0] === "string"){
                    console.log("Fetch wasnt allwed detected")
                    return;
                }
                setItems(data);
            } catch (err) {
                console.error("Error while loading the Courses:", err);
            }
        };    
        loadData();
    }, [fetchFromBackend]);

    return (
        <div>
            <h2 style={{marginTop: '0'}}>Module</h2>
            <Grid
                items={items}
                setItems={setItems}
                onRename={handleRename}
                onDelete={handleDelete}
                onClick={handleClick}
            />
        </div>
    );
}

export default ModulPage;