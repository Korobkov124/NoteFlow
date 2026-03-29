import { useState, useEffect } from "react"
import { getColors, getTags, deleteNote } from "../services/noteService";
import { parseJwt } from "../utils/jwt";
import Delete from "../assets/delete.png"
import Forward from "../assets/forward.png"
import SharedPopup from "./SharedPopup";
import "./UpdNotePopup.css";
import "./ConfirmDelPopup.css";

const UpdNotePopup = ({ note, onClose, onDelete }) => {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSharedPopup, setShowSharedPopup] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const token = localStorage.getItem("token");
    const user = parseJwt(token);
    const userEmail =
    user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];


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

    const currentTag = tags.find(t => t.id === note?.tagId);
    const currentColor = colors.find(c => c.id === currentTag?.colorId);

    const getColorClass = (name) => {
    switch (name) {
        case "Red": return "red-tag";
        case "Green": return "green-tag";
        case "Blue": return "blue-tag";
        case "Yellow": return "orange-tag";
        case "Purple": return "purple-tag";
        default: return "";
    }
};

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("popup-overlay")) {
            onClose();
        }
    };

    const handleDeleteClick = () => {
        setShowConfirmPopup(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteNote(note.id);
            onDelete?.();
            setShowConfirmPopup(false);
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    const handleForwardClick = () => {
        setShowSharedPopup(true);
    };

    const handleConfirmOverlayClick = (e) => {
        if (e.target.classList.contains("confirm-popup-overlay")) {
            setShowConfirmPopup(false);
        }
    };

    const handleCloseSharedPopup = () => {
        setShowSharedPopup(false);
    };

    return (
        <>
            <div className="popup-overlay" onClick={handleOverlayClick}>
                <div className="popup-note">
                    <div className="popup-note-content">

                        <div className="popup-header-note">
                            <p className="popup-note-type-left">Редактировать</p>
                            <div className="popup-note-type-right">
                                <img src={Delete} alt="delete" className="delete-icon" onClick={handleDeleteClick}/>
                                <img src={Forward} alt="share" className="forward-icon" onClick={handleForwardClick}/>
                            </div>
                        </div>

                        <div className="popup-name-note-content">
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="popup-main-note-content">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        <div className="popup-main-footer-note">
                            <p>Тэг: 
                                <span className={`tag ${getColorClass(currentColor?.name)}`}>
                                    {currentTag?.name || "Без тега"}
                                </span>
                            </p>
                            <p>Автор: {userEmail}</p>
                            <p>Дата: {note?.createdAt 
                            ? new Date(note.createdAt).toLocaleDateString() 
                            : "—"}</p>
                        </div>

                        <div className="footer-button">
                            <button className="save-btn">Сохранить</button>
                            <button className="cancle-btn" onClick={onClose}>Отмена</button>
                        </div>

                    </div>
                </div>
            </div>

            {showConfirmPopup && (
                <div className="confirm-popup-overlay" onClick={handleConfirmOverlayClick}>
                    <div className="confirm-popup">

                        <div className="confirm-popup-content">
                            <p>Вы уверены, что хотите удалить заметку?</p>
                        </div>

                        <div className="confirm-btn">
                            <button className="confirm-delete-btn" onClick={handleConfirmDelete}>
                                Удалить
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {showSharedPopup && (
                <SharedPopup onClose={handleCloseSharedPopup} />
            )}
        </>
    );
};

export default UpdNotePopup;