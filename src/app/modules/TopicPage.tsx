import { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "../../components/grid/Grid";
import type { BoxData } from "../../components/grid/Box";

function TopicPage() {
    const { id } = useParams(); // Modul-ID from URL
    const [items, setItems] = useState<BoxData[]>([
        { id: 1, name: "Box 1" },
        { id: 2, name: "Ein Titel" },
    ]);

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
        //navigate(`/module/${id}`)
        console.log(`Clicked: ID=${id}`);
    };

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