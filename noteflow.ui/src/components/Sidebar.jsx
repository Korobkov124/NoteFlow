import "./Sidebar.css";
import UsersIcon from "../assets/users.png";
import PlusIcon from "../assets/plus.png";
const Sidebar = ({ isOpen, onToggle}) => {
    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>

            <button
                className={`toggle-btn ${isOpen ? "rotate" : ""}`}
                onClick={onToggle}>
                <span className="arrow"></span>
            </button>

            <div className="sidebar-content">
                <img src={UsersIcon} alt="Users" className="users-icon" />
                <img src={PlusIcon} alt="Add" className="plus-icon" />
            </div>

        </div>
    );
};

export default Sidebar;