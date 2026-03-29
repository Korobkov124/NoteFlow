import { useState, useEffect } from "react";
import { addNote, getTags, getColors } from "../services/noteService";
import "./UpdNotePopup.css";

const AddNotePopup = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tagsData = await getTags();
                const colorsData = await getColors();
                setTags(tagsData.tags);
                setColors(colorsData);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const getColorByTag = (tag) => {
        if (!Array.isArray(colors) || colors.length === 0) 
            return null;

        return colors.find(c => c.id === tag.colorId);
    };

    const getColorClass = (colorName) => {
        switch (colorName) {
            case "Red": return "red-tag";
            case "Green": return "green-tag";
            case "Blue": return "blue-tag";
            case "Yellow": return "orange-tag";
            case "Purple": return "purple-tag";
            default: return "";
        }
    };

    const handleAdd = async () => {
        try {
            await addNote(title, content, selectedTag);

            onAdd?.();

            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("popup-overlay")) {
            onClose();
        }
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="popup-note">
                <div className="popup-note-content">

                    <div className="popup-header-note">
                        <p className="popup-note-type-left">Добавить заметку</p>
                    </div>

                    <div className="popup-name-note-content">
                        <input placeholder="Проект" type="text" value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="popup-main-note-content">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="tag-line">
                        <p>Тэг:</p>
                            {tags.map(tag => (
                                <span
                                    key={tag.id}
                                    className={`tag 
                                        ${selectedTag === tag.id ? "active" : ""} 
                                        ${getColorClass(getColorByTag(tag)?.name)}
                                    `}
                                    onClick={() => {
                                        setSelectedTag(tag.id);
                                    }}
                                >
                                    {tag.name}
                                </span>
                            ))}
                    </div>

                    <div className="footer-button">
                        <button className="save-btn" onClick={handleAdd}>Добавить</button>
                        <button className="cancle-btn" onClick={onClose}>Отмена</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddNotePopup;