import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar.jsx";
import CardsGrid from "../components/CardsGrid.jsx";
import AddNotePopup from "../components/AddNotePopup.jsx";
import "./Home.css";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const openAddPopup = () => {
        setIsAddPopupOpen(true);
    };

    const closeAddPopup = () => {
        setIsAddPopupOpen(false);
    };

    return (
        <div className="home">
            <Header />

            <div className="home-content">
                <div className="cards-wrapper">
                    <CardsGrid />
                </div>

                <Sidebar isOpen={isOpen} onToggle={toggleOpen} onAddNote={openAddPopup} />
                {isAddPopupOpen && <AddNotePopup onClose={closeAddPopup} />}
            </div>
        </div>
    );
}

export default Home;