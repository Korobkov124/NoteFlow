import { getColors, getTags, deleteNote } from './noteService';

const API_BASE_URL = 'http://localhost:5115/api';
const getToken = () => localStorage.getItem('token');

export const loadPopupData = async () => {
    try {
        const [tagsData, colorsData] = await Promise.all([
            getTags(),
            getColors()
        ]);

        const tags = Array.isArray(tagsData) ? tagsData : (tagsData.tags || []);

        return {
            tags,
            colors: colorsData || []
        };
    } catch (error) {
        console.error("Ошибка загрузки данных для редактора:", error);
        throw error;
    }
};

export const removeNote = async (noteId) => {
    if (!noteId) throw new Error("ID заметки не указан");
    await deleteNote(noteId);
};

export const saveNoteChanges = async ({ id, title, content }) => {
    const token = getToken();

    if (!token) throw new Error("Нет токена авторизации");
    if (!id || id === "00000000-0000-0000-0000-000000000000") {
        throw new Error("Невалидный ID заметки.");
    }

    const bodyPayload = {
        noteId: id,
        title: title,
        content: content
    };


    const response = await fetch(`${API_BASE_URL}/Note/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPayload)
    });

    if (!response.ok) {
        const errText = await response.text();
        let errorMsg = `Ошибка ${response.status}`;
        try {
            const errJson = JSON.parse(errText);
            errorMsg = errJson.message || errJson.detail || errorMsg;
        } catch (e) {
            if (errText) errorMsg = errText;
        }
        throw new Error(errorMsg);
    }

    return {
        id,
        title,
        content
    };
};

export const getTagColorHex = (colorName) => {
    const colorMap = {
        "Red": "#ff4d4f",
        "Green": "#52c41a",
        "Blue": "#028DFF",
        "Yellow": "#faad14",
        "Purple": "#722ed1",
        "Orange": "#fa8c16",
        "Cyan": "#13c2c2",
        "Default": "#ccc"
    };
    return colorMap[colorName] || colorMap["Default"];
};