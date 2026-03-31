const API_BASE_URL = 'http://localhost:5115/api';

const getToken = () => localStorage.getItem('token');

export const searchUsers = async (searchQuery) => {
    const token = getToken();

    if (!token) {
        throw new Error("Нет токена авторизации. Пожалуйста, войдите в систему.");
    }

    const url = `${API_BASE_URL}/User/search?name=${encodeURIComponent(searchQuery)}`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMsg = `Ошибка сервера: ${response.status}`;

        if (contentType && contentType.includes("application/json")) {
            try {
                const errData = await response.json();
                errorMsg = errData.message || errorMsg;
            } catch (e) {
            }
        } else {
            const text = await response.text();
            if (text) errorMsg = text;
        }

        throw new Error(errorMsg);
    }

    const text = await response.text();

    if (!text) {
        return [];
    }

    try {
        const data = JSON.parse(text);
        return Array.isArray(data) ? data : (data ? [data] : []);
    } catch (e) {
        console.error("Не удалось распарсить ответ сервера:", text);
        throw new Error("Сервер вернул некорректные данные");
    }
};