import { useState, useEffect } from "react";
import { getNotes } from "../services/noteService";
import Note from "../components/Note";
import UpdNotePopup from "./UpdNotePopup";
import "./CardsGrid.css"

const CardsGrid = ({ tags, colors }) => {
    const [notes, setNotes] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const fetchNotes = async () => {
        try {
            const data = await getNotes();
            setNotes(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleNoteClick = (note) => {
        setSelectedNote(note);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await getNotes();
                setNotes(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchNotes();
    }, []);

    return (
        <>
            <div className="cards-grid">
                {notes.map((note) => (
                    <Note key={note.id} note={note} tags={tags} colors={colors} onClick={() => handleNoteClick(note)} />
                ))}
            </div>

            {isPopupOpen && <UpdNotePopup note={selectedNote} onClose={closePopup} onDelete={fetchNotes} />}
        </>
    );
}

export default CardsGrid;