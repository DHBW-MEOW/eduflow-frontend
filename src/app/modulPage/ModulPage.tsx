import { useEffect, useState } from "react";
import { Grid } from "../../components/grid/Grid";
import type { BoxData } from "../../components/grid/Box";
import { useNavigate } from "react-router-dom";

function ModulPage() {
    const navigate = useNavigate();
    const [items, setItems] = useState<BoxData[]>([
        { id: "1", title: "Box 1" },
        { id: "2", title: "Ein Titel" },
    ]);

    const addItem = (newElement: BoxData) => {
        setItems(oldItems => [...oldItems, newElement]);
    };

    const handleRename = (id: string, newTitle: string) => {
        console.log(`Rename: ID=${id}, Neuer Titel=${newTitle}`);
    };

    const handleDelete = (id: string) => {
        console.log(`Delete: ID=${id}`);
    };  

    const handleClick = (id: string) => {
        navigate(`/module/${id}`)
        console.log(`Clicked: ID=${id}`);
    };

    useEffect(() => {
        fetch("/api/modules")
        .then((res) => {
        if (!res.ok) throw new Error("Fehler beim Abrufen");
            return res.json();
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