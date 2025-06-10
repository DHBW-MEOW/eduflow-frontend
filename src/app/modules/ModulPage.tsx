import { useEffect, useState } from "react";
import { fetchFromBackend } from "../../fetchBackend";
import { Grid } from "../../components/grid/Grid";
import type { BoxData } from "../../components/grid/Box";
import { useNavigate } from "react-router-dom";

function ModulPage() {
    const navigate = useNavigate();
    const [items, setItems] = useState<BoxData[]>([]);

    const addItem = (newElement: BoxData) => {
        setItems(oldItems => [...oldItems, newElement]);
    };

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
            console.log(`Rename: ID=${id}, Neuer Titel=${newTitle}`);
        } catch (err) {
            console.error("Fehler beim Umbenennen:", err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const topics = await fetchFromBackend<{ id: number }[]>({
                method: "GET",
                endpoint: `data/topic?course_id=${id}`,
            });
            for (const topic of topics) {
                await fetchFromBackend<void>({
                    method: "DELETE",
                    endpoint: "data/topic",
                    body: { id: topic.id },
                });
            };
            await fetchFromBackend<void>({
                method: "DELETE",
                endpoint: "data/course",
                body: { id: id },
            });
            console.log(`Delete: ID=${id}`);
        } catch (err) {
            console.error("Fehler beim Löschen:", err);
        }
    };  

    const handleClick = (id: number) => {
        navigate(`/modules/${id}`);
        console.log(`Clicked: ID=${id}`);
    };

    //TODO: zuerst habe ich mit .then().catch() gemacht, allerdings ist async/await besser -> schauen, ob alles noch gleich funktioniert
    /*useEffect(() => {
        fetchFromBackend<{ id: number; name: string; details: string }[]>({
            method: "GET",
            endpoint: "data/course"
        })
        .then((data) => setItems(data))
        .catch((err) => console.error(err));
    }, []);*/

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchFromBackend<{ id: number; name: string; details: string }[]>({
                    method: "GET",
                    endpoint: "data/course",
                });
                setItems(data);
            } catch (err) {
                console.error("Fehler beim Laden der Kurse:", err);
            }
        };    
      loadData();
    }, []);

    return (
        <div>
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