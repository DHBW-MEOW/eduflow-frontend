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

    const handleRename = (id: number, newTitle: string) => {
        console.log(`Rename: ID=${id}, Neuer Titel=${newTitle}`);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete: ID=${id}`);
    };  

    const handleClick = (id: number) => {
        navigate(`/modules/${id}`);
        console.log(`Clicked: ID=${id}`);
    };

    useEffect(() => {
        fetchFromBackend<{ id: number; name: string; details: string }[]>({
            method: "GET",
            endpoint: "data/course"
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

export default ModulPage;