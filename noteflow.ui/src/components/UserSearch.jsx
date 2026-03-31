import React, { useState, useEffect, useRef } from 'react';
import './UserSearch.css';
import { subscribeToUser, getCurrentUserId } from '../services/friendService';
import { searchUsers } from '../services/userService.js';

const UserSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dropdownRef = useRef(null);

    const currentUserId = getCurrentUserId();

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                await handleSearch(query);
            } else {
                setResults([]);
                setError(null);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSearch = async (searchQuery) => {
        setLoading(true);
        setError(null);

        try {
            const data = await searchUsers(searchQuery);
            setResults(data);
        } catch (err) {
            console.error("Ошибка поиска:", err);
            setError(err.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (userId, userName) => {
        try {
            const result = await subscribeToUser(userId, userName);
            alert(result.message);

            setResults([]);
            setQuery('');
        } catch (err) {
            console.error("Ошибка подписки:", err);
            alert(err.message);
        }
    };

    return (
        <div className="user-search-wrapper" ref={dropdownRef}>
            <h2 className="search-title">Поиск пользователей</h2>
            <p className="search-subtitle">Найдите друга по имени и подпишитесь на него</p>

            <div className="search-input-container">
                <svg className="search-icon-small" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                    type="text"
                    placeholder="Введите имя ..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="user-search-field"
                    autoFocus
                />
                {loading && <div className="spinner"></div>}
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="search-results-area">
                {results.length > 0 ? (
                    <ul className="users-list">
                        {results
                            .filter(user => user.id !== currentUserId)
                            .map((user) => (
                                <li key={user.id} className="user-item">
                                    <div className="user-avatar-circle">
                                        {user.userName ? user.userName.charAt(0).toUpperCase() : '?'}
                                    </div>
                                    <div className="user-details">
                                        <span className="user-name-text">{user.userName}</span>
                                        <span className="user-id-text">ID: {user.id.toString().slice(0, 8)}...</span>
                                    </div>
                                    <button
                                        className="btn-subscribe"
                                        onClick={() => handleSubscribe(user.id, user.userName)}
                                    >
                                        Подписаться
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    query.length >= 2 && !loading && !error && (
                        <div className="empty-state">
                            <p>Ничего не найдено</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default UserSearch;