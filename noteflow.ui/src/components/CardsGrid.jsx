import { useState } from "react";
import Note from "../components/Note";
import UpdNotePopup from "./UpdNotePopup";
import "./CardsGrid.css"
const CardsGrid = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleNoteClick = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <div className="cards-grid">
                <Note onClick={handleNoteClick} />
                <Note />
                <Note />
                <Note />
                <Note />
                <Note />
                <Note />
                <Note />
            </div>

            {isPopupOpen && <UpdNotePopup onClose={closePopup} />}
        </>
    );
}

export default CardsGrid;