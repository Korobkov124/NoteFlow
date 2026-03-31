import { useState, useEffect } from "react";
import { addNote, getTags, getColors } from "../services/noteService";
import "./AddNotePopup.css";

const AddNotePopup = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tagsData = await getTags();
                const colorsData = await getColors();
                setTags(tagsData.tags || []);
                setColors(colorsData || []);
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
            }
        };
        fetchData();
    }, []);

    const getColorByTag = (tag) => {
        if (!Array.isArray(colors) || colors.length === 0 || !tag) return null;
        return colors.find(c => c.id === tag.colorId);
    };

    const getTagStyle = (tag) => {
        const colorObj = getColorByTag(tag);
        if (!colorObj) return {};

        const colorMap = {
            "Red": "#ff4d4f",
            "Green": "#52c41a",
            "Blue": "#028DFF",
            "Yellow": "#faad14",
            "Purple": "#722ed1",
            "Orange": "#fa8c16"
        };

        const hexColor = colorMap[colorObj.name] || '#ccc';

        return {
            backgroundColor: selectedTag === tag.id ? hexColor : 'transparent',
            color: selectedTag === tag.id ? '#fff' : hexColor,
            borderColor: hexColor
        };
    };

    const handleAdd = async () => {
        if (!title.trim()) {
            alert("Пожалуйста, введите название заметки");
            return;
        }

        setIsLoading(true);
        try {
            await addNote(title, content, selectedTag);
            onAdd?.();
            onClose();
        } catch (err) {
            console.error("Ошибка при создании заметки:", err);
            alert("Не удалось создать заметку");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("popup-overlay")) {
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleAdd();
        }
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="popup-window animate-in">

                <div className="popup-header">
                    <h2>Новая заметка</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="popup-body" onKeyDown={handleKeyDown}>

                    <div className="input-group">
                        <label>Название</label>
                        <input
                            type="text"
                            placeholder="Например: Проект NoteFlow"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="input-group">
                        <label>Описание</label>
                        <textarea
                            placeholder="Опишите детали задачи..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                        />
                    </div>

                    <div className="tags-section">
                        <label>Тег (цвет)</label>
                        <div className="tags-list">
                            {tags.length === 0 ? (
                                <span className="no-tags">Теги не найдены</span>
                            ) : (
                                tags.map(tag => (
                                    <button
                                        key={tag.id}
                                        className={`tag-item ${selectedTag === tag.id ? 'active' : ''}`}
                                        style={getTagStyle(tag)}
                                        onClick={() => setSelectedTag(tag.id === selectedTag ? null : tag.id)}
                                    >
                                        {tag.name}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="popup-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Отмена
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleAdd}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Сохранение...' : 'Создать'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNotePopup;