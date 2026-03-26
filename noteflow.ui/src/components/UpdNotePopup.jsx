import { useState } from "react"
import Delete from "../assets/delete.png"
import Forward from "../assets/forward.png"
import SharedPopup from "./SharedPopup";
import "./UpdNotePopup.css";
import "./ConfirmDelPopup.css";

const UpdNotePopup = ({ onClose }) => {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSharedPopup, setShowSharedPopup] = useState(false);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("popup-overlay")) {
            onClose();
        }
    };

    const handleDeleteClick = () => {
        setShowConfirmPopup(true);
    };

    const handleConfirmDelete = () => {
        setShowConfirmPopup(false);
        onClose();
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
                            <input placeholder="Проект" type="text"></input>
                        </div>

                        <div className="popup-main-note-content">
                            <textarea></textarea>
                        </div>

                        <div className="popup-main-footer-note">
                            <p>Тэг: 
                                <span className="tag">Работа</span>
                                <span className="tag-dot orange-tag"></span>
                                <span className="tag-dot green-tag"></span>
                                <span className="tag-dot red-tag"></span>
                                <span className="tag-dot blue-tag"></span>
                                <span className="tag-dot purple-tag"></span>
                            </p>
                            <p>Автор: Кристина Горностаева</p>
                            <p>Дата: 25.03.2026</p>
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