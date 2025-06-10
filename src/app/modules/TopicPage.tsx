import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../components/grid/Grid";
import { fetchFromBackend } from "../../fetchBackend";
import type { BoxData } from "../../components/grid/Box";

function TopicPage(): JSX.Element {
    const { moduleId } = useParams<{ moduleId: string }>();
    const navigate = useNavigate();
    const [items, setItems] = useState<BoxData[]>([]);
   
    const addItem = (newElement: BoxData) => {
        setItems(oldItems => [...oldItems, newElement]);
    };

    const handleRename = (id: number, newTitle: string) => {
        console.log(`Rename: ID=${id}, Neuer Titel=${newTitle}`);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete: ID=${id}`);
    };  

    const handleClick = (id: number) => {
        if (!id) return;
        navigate(`/modules/${moduleId}/topics/${id}`);
        console.log(`Clicked: ID=${id}`);
    };

    useEffect(() => {
        fetchFromBackend<{ id: number; name: string; details: string }[]>({
            method: "GET",
            endpoint: `data/topic?course_id=${moduleId}`
        })
        .then((data) => setItems(data))
        .catch((err) => console.error(err));
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

export default TopicPage;