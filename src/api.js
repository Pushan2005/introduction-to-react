const API_URL = "https://introduction-to-express.onrender.com/api/items";

export const getItems = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};

export const addItem = async (item) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
    const data = await response.json();
    return data;
};

export const updateItem = async (id, item) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
    const data = await response.json();
    return data;
};

export const deleteItem = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    return { success: true };
};
