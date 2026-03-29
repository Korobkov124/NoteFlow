import { parseJwt } from "../utils/jwt";

export const getNotes = async () => {
    const token = localStorage.getItem("token");
    const payload = parseJwt(token);

    const userId = payload?.Id;

    const response = await fetch(
    `http://localhost:5115/api/note/all?userId=${userId}`,
        {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка получения заметок");
    }

    return response.json();
};


export const addNote = async (title, content, tagId) => {
    const token = localStorage.getItem("token");
    const user = parseJwt(token);

    const response = await fetch("http://localhost:5115/api/note/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            title,
            content,
            tagId,
            userId: user.Id
        }),
    });

    if (!response.ok) {
        throw new Error("Ошибка добавления заметки");
    }
};

export const getTags = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5115/api/tag/all", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Ошибка загрузки тегов");
    }

    return response.json();
};

export const getColors = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5115/api/color/all", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Ошибка загрузки цветов");
    }

    return response.json();
};

export const deleteNote = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:5115/api/Note/delete/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка удаления заметки");
    }
};