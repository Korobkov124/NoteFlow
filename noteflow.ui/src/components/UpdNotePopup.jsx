import React, { useState, useEffect } from "react";
import { loadPopupData, removeNote, saveNoteChanges, getTagColorHex } from "../services/notePopupService";
import { parseJwt } from "../utils/jwt";
import SharedPopup from "./SharedPopup";
import "./UpdNotePopup.css";

const UpdNotePopup = ({ note, onClose, onDelete, onUpdate }) => {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSharedPopup, setShowSharedPopup] = useState(false);
    const noteId = note?.id || note?.Id;
    const noteTagId = note?.tagId || note?.TagId;
    const [title, setTitle] = useState(note?.title || "");
    const [content, setContent] = useState(note?.content || "");
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const token = localStorage.getItem("token");
    const user = parseJwt(token);
    const userEmail = user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

    useEffect(() => {
        const initPopup = async () => {
            setIsLoading(true);
            try {
                const data = await loadPopupData();
                setTags(data.tags);
                setColors(data.colors);
            } catch (err) {
                console.error("Не удалось загрузить справочники:", err);
            } finally {
                setIsLoading(false);
            }
        };
        initPopup();
    }, []);

    const currentTag = tags.find(t => t.id === noteTagId);
    const currentColor = colors.find(c => c.id === currentTag?.colorId);
    const tagColorHex = getTagColorHex(currentColor?.name);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("popup-overlay")) onClose();
    };

    const handleSave = async () => {
        if (!title.trim()) {
            alert("Заголовок не может быть пустым");
            return;
        }

        if (!noteId || noteId === "00000000-0000-0000-0000-000000000000") {
            alert("Ошибка: ID заметки не найден.");
            return;
        }

        setIsSaving(true);
        try {
            const updatedNote = await saveNoteChanges({
                id: noteId,
                title,
                content
            });

            if (onUpdate) {
                onUpdate(updatedNote);
            }

            onClose();
        } catch (err) {
            console.error("Ошибка сохранения:", err);
            alert(`Не удалось сохранить: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteClick = () => setShowConfirmPopup(true);

    const handleConfirmDelete = async () => {
        try {
            await removeNote(noteId);
            if (onDelete) onDelete();
            setShowConfirmPopup(false);
            onClose();
        } catch (err) {
            console.error("Ошибка удаления:", err);
            alert(`Не удалось удалить: ${err.message}`);
        }
    };

    const handleForwardClick = () => setShowSharedPopup(true);
    const handleCloseSharedPopup = () => setShowSharedPopup(false);

    const handleConfirmOverlayClick = (e) => {
        if (e.target.classList.contains("confirm-popup-overlay")) setShowConfirmPopup(false);
    };

    if (isLoading) {
        return (
            <div className="popup-overlay">
                <div className="popup-note-modern">
                    <div className="loading-state" style={{ padding: '20px', textAlign: 'center' }}>Загрузка...</div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="popup-overlay" onClick={handleOverlayClick}>
                <div className="popup-note-modern">
                    <div className="popup-header-modern">
                        <h2 className="popup-title">Редактирование</h2>
                        <div className="popup-actions">
                            <button className="icon-btn" onClick={handleDeleteClick} disabled={isSaving}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                            <button className="icon-btn" onClick={handleForwardClick} disabled={isSaving}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                            </button>
                        </div>
                    </div>

                    <div className="popup-input-group">
                        <input className="modern-input" placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isSaving} />
                    </div>
                    <div className="popup-textarea-group">
                        <textarea className="modern-textarea" placeholder="Текст..." value={content} onChange={(e) => setContent(e.target.value)} disabled={isSaving} />
                    </div>

                    <div className="popup-info-block">
                        <div className="info-row">
                            <span className="info-label">Тэг:</span>
                            {currentTag ? (
                                <span className="info-tag-badge" style={{ backgroundColor: tagColorHex, color: '#fff' }}>{currentTag.name}</span>
                            ) : <span style={{color:'#777'}}>Нет тега</span>}
                        </div>
                        <div className="info-row">
                            <span className="info-label">Автор:</span>
                            <span className="info-value">{userEmail || "Неизвестно"}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Дата:</span>
                            <span className="info-value">{note?.createdAt ? new Date(note.createdAt).toLocaleDateString() : "—"}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="popup-footer-buttons">
                        <button
                            className="btn-save"
                            onClick={handleSave}
                            disabled={isSaving}
                            style={{ opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'wait' : 'pointer' }}
                        >
                            {isSaving ? "Сохранение..." : "Сохранить"}
                        </button>
                        <button className="btn-cancel" onClick={onClose} disabled={isSaving} style={{ opacity: isSaving ? 0.7 : 1 }}>Отмена</button>
                    </div>
                </div>
            </div>

            {showConfirmPopup && (
                <div className="confirm-popup-overlay" onClick={handleConfirmOverlayClick}>
                    <div className="confirm-popup-modern">
                        <h3>Удалить заметку?</h3>
                        <p>Это действие нельзя отменить.</p>
                        <div className="confirm-actions">
                            <button className="btn-confirm-delete" onClick={handleConfirmDelete}>Да, удалить</button>
                            <button className="btn-cancel-small" onClick={() => setShowConfirmPopup(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}

            {showSharedPopup && <SharedPopup onClose={handleCloseSharedPopup} />}
        </>
    );
};

export default UpdNotePopup;