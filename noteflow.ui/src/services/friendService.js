const API_BASE_URL = 'http://localhost:5115/api';

const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
        const user = JSON.parse(userStr);
        return {
            id: user.id || user.Id,
            name: user.name || user.UserName || 'Гость'
        };
    } catch (e) {
        console.error("Ошибка парсинга данных пользователя:", e);
        return null;
    }
};

const getToken = () => localStorage.getItem('token');
export const subscribeToUser = async (friendId, friendName) => {
    const currentUser = getCurrentUser();
    const token = getToken();

    if (!token) {
        throw new Error("Нет токена авторизации. Пожалуйста, войдите в систему.");
    }

    if (!currentUser || !currentUser.id) {
        throw new Error("Не удалось определить текущего пользователя. Войдите снова.");
    }

    if (currentUser.id === friendId) {
        throw new Error("Вы не можете подписаться на самого себя!");
    }

    const response = await fetch(`${API_BASE_URL}/Friend/add`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: currentUser.id,
            friendId: friendId
        })
    });

    const text = await response.text();

    if (!response.ok) {
        let errorMsg = `Ошибка сервера: ${response.status}`;
        if (text) {
            try {
                const errData = JSON.parse(text);
                errorMsg = errData.message || errorMsg;
            } catch (e) {
                errorMsg = text || errorMsg;
            }
        }
        throw new Error(errorMsg);
    }

    return { success: true, message: `Вы успешно подписались на ${friendName}!` };
};

export const getCurrentUserId = () => {
    const user = getCurrentUser();
    return user ? user.id : null;
};