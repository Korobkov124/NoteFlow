import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePopup.css";

const ProfilePopup = ({ onClose }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "" });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const avatarLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        onClose();

        navigate('/Login');
        window.location.reload();
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("profile-overlay")) {
            onClose();
        }
    };

    return (
        <div className="profile-overlay" onClick={handleOverlayClick}>
            <div className="profile-popup-window">

                <div className="profile-header">
                    <div className="profile-avatar-large">
                        {avatarLetter}
                    </div>
                    <div className="profile-info-block">
                        <h2 className="profile-name">{user.name}</h2>
                        <p className="profile-email">{user.email}</p>
                    </div>
                </div>

                <div className="profile-divider"></div>

                <div className="profile-actions">
                    <button className="action-btn settings-btn">
                        Настройки профиля
                    </button>

                    <button className="action-btn logout-btn" onClick={handleLogout}>
                        Выйти из аккаунта
                    </button>
                </div>

                <div className="profile-footer">
                    <button className="close-text-btn" onClick={onClose}>
                        Отмена
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProfilePopup;