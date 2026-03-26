import Logo from "/src/assets/logo.png";
import Bell from "/src/assets/doorbell.png";
import SearchIcon from "/src/assets/search.png";
import ProfileIcon from "/src/assets/profile.png";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <img src={Logo} alt="Logo" className="logo" />
                <h1>NoteFlow</h1>
            </div>

            <div className="header-center">
                <div className="search-wrapper">
                    <img src={SearchIcon} alt="Search" className="search-icon" />
                    <input type="text" placeholder="Найти" />
                </div>
            </div>

            <div className="header-right">
                <img src={Bell} alt="Notifications" className="icon" />
                <img src={ProfileIcon} alt="Search" className="profile-icon" />
            </div>
        </header>
    );
};

export default Header;