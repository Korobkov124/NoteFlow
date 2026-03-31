import { useState, useEffect } from "react";
import { getNotes } from "../services/noteService";
import Note from "../components/Note";
import UpdNotePopup from "./UpdNotePopup";
import "./CardsGrid.css";

const CardsGrid = ({ tags, colors }) => {
    const [notes, setNotes] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const fetchNotes = async () => {
        const data = await getNotes();
        setNotes(data);
    };

    const handleNoteClick = (note) => {
        setSelectedNote(note);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedNote(null);
    };

    const handleUpdateNote = (updatedNote) => {

        setNotes(prevNotes => {
            // Проверяем, есть ли заметка с таким ID в списке
            const exists = prevNotes.some(n => n.id === updatedNote.id);

            if (!exists) {
                return [updatedNote, ...prevNotes];
            }

            const newNotes = prevNotes.map(n =>
                n.id === updatedNote.id ? updatedNote : n
            );

            return newNotes;
        });

        closePopup();
    };

    const handleDeleteNote = () => {
        fetchNotes();
        closePopup();
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <>
            <div className="cards-grid">
                {notes.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#888' }}>Заметок пока нет</p>
                ) : (
                    notes.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            tags={tags}
                            colors={colors}
                            onClick={() => handleNoteClick(note)}
                        />
                    ))
                )}
            </div>

            {isPopupOpen && selectedNote && (
                <UpdNotePopup
                    note={selectedNote}
                    onClose={closePopup}
                    onDelete={handleDeleteNote}
                    onUpdate={handleUpdateNote}
                />
            )}
        </>
    );
};

export default CardsGrid;