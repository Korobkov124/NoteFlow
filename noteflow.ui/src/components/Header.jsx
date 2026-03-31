import { useState, useEffect, useRef } from 'react';
import * as signalR from "@microsoft/signalr";
import Logo from "/src/assets/logo.png";
import ProfilePopup from "./ProfilePopup";
import NotificationPopup from "./NotificationPopup";
import "./Header.css";

const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [hasNotifications, setHasNotifications] = useState(false);

    const profileRef = useRef(null);
    const notifRef = useRef(null);
    const connectionRef = useRef(null);

    const getUserData = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            return {
                name: parsed.name || parsed.UserName || "Гость",
                id: parsed.id || parsed.Id
            };
        }
        return { name: "Гость", id: null };
    };

    const user = getUserData();
    const avatarLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';
    const currentUserId = user.id;

    useEffect(() => {
        if (!currentUserId) return;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5115/notificationHub", {
                accessTokenFactory: () => localStorage.getItem('token')
            })
            .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
            .build();

        connectionRef.current = connection;

        connection.on("ReceiveNotification", (data) => {
            console.log("🔔 Получено уведомление:", data);

            setNotifications(prev => {
                const exists = prev.some(n => n.id === data.id);
                if (exists) return prev;
                return [data, ...prev];
            });
            setHasNotifications(true);
        });

        connection.start()
            .then(() => {
                console.log("✅ SignalR Connected");
                // Подписываемся на группу
                return connection.invoke("SubscribeToUser", currentUserId);
            })
            .then(() => {
                console.log(`📡 Подписан на группу: user_${currentUserId}`);
            })
            .catch(err => console.error("❌ SignalR Error:", err));

        return () => {
            if (connectionRef.current) {
                console.log("🛑 Остановка SignalR соединения...");
                connectionRef.current.stop()
                    .then(() => console.log("Соединение остановлено"))
                    .catch(err => console.error("Ошибка остановки:", err));
            }
        };
    }, [currentUserId]);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = currentUserId || user.id;

            if (!userId) return;

            const response = await fetch(`http://localhost:5115/api/Notification?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setNotifications(data);
                const hasUnread = data.some(n => !n.isRead);
                setHasNotifications(hasUnread);
            } else {
                console.error("Ошибка загрузки:", response.status);
            }
        } catch (error) {
            console.error("Ошибка загрузки истории:", error);
        }
    };

    const handleNotifClick = () => {
        setIsNotifOpen(!isNotifOpen);
        setIsProfileOpen(false);
        if (!isNotifOpen) {
            fetchNotifications();
        }
    };

    const handleMarkAllRead = async (e) => {
        e.stopPropagation();
        try {
            const token = localStorage.getItem('token');
            const userId = currentUserId || user.id;

            if (!userId) {
                alert("Ошибка: пользователь не найден");
                return;
            }

            const url = `http://localhost:5115/api/Notification/markAllRead?userId=${userId}`;

            console.log("Отправка запроса на:", url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
                setHasNotifications(false);
                setIsNotifOpen(false);
                console.log("✅ Все уведомления отмечены как прочитанные");
            } else {
                const errText = await response.text();
                console.error("Ошибка сервера:", response.status, errText);
                alert(`Ошибка: ${response.status}`);
            }
        } catch (error) {
            console.error("Критическая ошибка:", error);
            alert("Не удалось соединиться с сервером");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
            if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="header">
            <div className="header-left">
                <img src={Logo} alt="Logo" className="logo" />
                <h1>NoteFlow</h1>
            </div>

            <div className="header-center">
                <div className="search-wrapper">
                    <svg className="search-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" placeholder="Найти заметку..." className="search-input" />
                </div>
            </div>

            <div className="header-right">
                <div ref={notifRef} className="notification-area">
                    <div className="notification-wrapper" onClick={handleNotifClick}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a 2 2 0 0 1-3.46 0"/></svg>
                        {hasNotifications && <span className="notification-badge"></span>}
                    </div>

                    {isNotifOpen && (
                        <div className="notification-dropdown">
                            <NotificationPopup
                                notifications={notifications}
                                onMarkAllRead={handleMarkAllRead}
                                onClose={() => setIsNotifOpen(false)}
                            />
                        </div>
                    )}
                </div>

                <div className="profile-container" ref={profileRef}>
                    <div className={`profile-trigger ${isProfileOpen ? 'active' : ''}`} onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}>
                        <div className="avatar-circle">{avatarLetter}</div>
                    </div>
                    {isProfileOpen && <ProfilePopup onClose={() => setIsProfileOpen(false)} />}
                </div>
            </div>
        </header>
    );
};

export default Header;