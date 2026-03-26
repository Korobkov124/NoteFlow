import { useState } from "react"
import SearchIcon from "/src/assets/search.png";
import "./SharedPopup.css";

const SharedPopup = ({ onClose }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const users = [
        { id: 1, firstName: "Андрей", lastName: "Коробков" },
        { id: 2, firstName: "Илья", lastName: "Щербаков" },
    ];

    const handleCheckboxChange = (userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("shared-popup-overlay")) {
            onClose();
        }
    };

    return (
        <>
            <div className="shared-popup-overlay" onClick={handleOverlayClick}>
                <div className="shared-popup-note">
                    <div className="shared-popup-note-content">

                        <div className="shared-popup-header-note">
                            <p className="shared-popup-note-type-left">Поделиться заметкой</p>
                        </div>

                        <div className="shared-popup-name-note-content">
                            <div className="search-wrapper">
                                <img src={SearchIcon} alt="Search" className="search-icon" />
                                <input type="text" placeholder="Поиск" />
                            </div>
                        </div>

                        <div className="shared-popup-main-note-content">
                            <div className="shared-popup-users-list">
                                <table className="users-table">
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id} className="user-row">
                                                <td className="checkbox-cell">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUsers.includes(user.id)}
                                                        onChange={() => handleCheckboxChange(user.id)}
                                                    />
                                                </td>
                                                <td className="name-cell">
                                                    {user.firstName} {user.lastName}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="shared-footer-button">
                            <button className="shared-save-btn">Отправить</button>
                            <button className="shared-cancle-btn" onClick={onClose}>Отмена</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SharedPopup;