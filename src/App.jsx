import { useState, useEffect } from "react";
import { getItems, addItem, updateItem, deleteItem } from "./api";

function App() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [editItemId, setEditItemId] = useState(null);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        const data = await getItems();
        setItems(data);
    };

    const handleAddItem = async () => {
        if (name.trim() === "") return;
        const newItem = await addItem({ name });
        setItems([...items, newItem]);
        setName("");
    };

    const handleUpdateItem = async (id) => {
        if (name.trim() === "") return;
        const updatedItem = await updateItem(id, { name });
        setItems(items.map((item) => (item._id === id ? updatedItem : item)));
        setName("");
        setEditItemId(null);
    };

    const handleDeleteItem = async (id) => {
        await deleteItem(id);
        setItems(items.filter((item) => item._id !== id));
    };

    const handleEditClick = (item) => {
        setName(item.name);
        setEditItemId(item._id);
    };

    return (
        <div className="p-8">
            <h1>CRUD Demo</h1>
            <input
                className="m-8 ml-0"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                onClick={
                    editItemId
                        ? () => handleUpdateItem(editItemId)
                        : handleAddItem
                }
            >
                {editItemId ? "Update" : "Add"}
            </button>
            <ul>
                {items.map((item) => (
                    <li className="flex items-center space-x-2" key={item._id}>
                        {item.name}
                        <button
                            className="m-4"
                            onClick={() => handleEditClick(item)}
                        >
                            Edit
                        </button>
                        <button onClick={() => handleDeleteItem(item._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
