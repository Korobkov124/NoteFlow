import React from 'react';
import './NotificationPopup.css';

const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
};

const NotificationPopup = ({ notifications, onMarkAllRead, onClose }) => {
    const unreadCount = notifications ? notifications.filter(n => !n.isRead).length : 0;

    return (
        <div className="notification-popup">
            <div className="notif-header">
                <h3>Уведомления ({unreadCount})</h3>
                {unreadCount > 0 && (
                    <button className="mark-read-btn" onClick={onMarkAllRead}>
                        Прочитать все
                    </button>
                )}
                {onClose && (
                    <button className="close-btn" onClick={onClose}>×</button>
                )}
            </div>

            <div className="notif-list">
                {!notifications || notifications.length === 0 ? (
                    <div className="notif-empty">
                        <div className="empty-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                        </div>
                        <p>Нет новых уведомлений</p>
                    </div>
                ) : (
                    notifications.map((item) => {
                        const userName = item.senderName;
                        const actionText = item.message;
                        const dateVal = item.createdAt;
                        return (
                            <div key={item.id} className={`notif-item ${!item.isRead ? 'unread' : ''}`}>
                                <div className="notif-avatar">
                                    {getInitials(userName)}
                                </div>
                                <div className="notif-content">
                                    <div className="notif-text">
                                        <span className="user-name">{userName}</span>
                                        <span className="action-text"> {actionText}</span>
                                    </div>
                                    <div className="notif-time">
                                        {dateVal ? new Date(dateVal).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </div>
                                </div>
                                {!item.isRead && <div className="unread-dot"></div>}
                            </div>
                        );
                    })
                )}
            </div>

            <div className="notif-footer">
                <button className="view-all-btn" onClick={() => alert('Переход к списку')}>
                    Все подписчики
                </button>
            </div>
        </div>
    );
};

export default NotificationPopup;