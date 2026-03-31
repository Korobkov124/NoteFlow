import { useState } from "react";
import "./Sidebar.css";
import UsersIcon from "../assets/users.png";
import PlusIcon from "../assets/plus.png";
import UserSearch from "./UserSearch";

const Sidebar = ({ isOpen, onToggle, onAddNote }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleUsersClick = () => {
        setIsSearchOpen(true);
    };

    const handleCloseSearch = () => {
        setIsSearchOpen(false);
    };

    return (
        <>
            <div className={`sidebar-container ${isOpen ? "open" : ""}`}>

                <button className="magic-toggle" onClick={onToggle}>
                    <div className="toggle-icon">
                        <span className="bar bar-1"></span>
                        <span className="bar bar-2"></span>
                        <span className="bar bar-3"></span>
                    </div>
                </button>

                <div className="sidebar-panel">
                    <div className="sidebar-content">

                        <div
                            className="icon-item delay-1"
                            title="Пользователи"
                            onClick={handleUsersClick}
                        >
                            <div className="icon-bg"></div>
                            <img src={UsersIcon} alt="Users" className="side-icon" />
                        </div>

                        <div className="icon-item delay-2" onClick={onAddNote} title="Добавить заметку">
                            <div className="icon-bg"></div>
                            <img src={PlusIcon} alt="Add" className="side-icon" />
                        </div>

                    </div>
                </div>
            </div>

            {isSearchOpen && (
                <div className="search-modal-overlay" onClick={handleCloseSearch}>
                    <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={handleCloseSearch}>×</button>
                        <UserSearch />
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;