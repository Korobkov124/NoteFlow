import { useEffect, useState } from "react";
import { getNotes } from "../services/noteService.js";
import { getTags } from "../services/noteService.js";
import { getColors } from "../services/noteService.js";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar.jsx";
import CardsGrid from "../components/CardsGrid.jsx";
import AddNotePopup from "../components/AddNotePopup.jsx";
import "./Home.css";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);

    const fetchNotes = async () => {
        try {
            const data = await getNotes();
            setNotes(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNotes();

        const fetchTags = async () => {
            try {
                const dataTag = await getTags();
                const dataColors = await getColors();
                setColors(dataColors);
                setTags(dataTag.tags);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTags();
    }, []);

    const handleAddNote = (newNote) => {
        setNotes(prev => [newNote, ...prev]);
    };

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
                    <CardsGrid notes={notes} tags={tags} colors={colors} />
                </div>

                <Sidebar isOpen={isOpen} onToggle={toggleOpen} onAddNote={openAddPopup} />
                {isAddPopupOpen && <AddNotePopup onClose={closeAddPopup} onAdd={handleAddNote} />}
            </div>
        </div>
    );
}

export default Home;