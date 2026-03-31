import AbstractPattern from "./AbstractPattern";
import "./Note.css";

const truncateTitle = (text, maxLength = 48) => {
    if (!text) return "Без названия";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
};

const Note = ({ note, tags, colors, onClick }) => {
    const tag = tags?.find(t => t.id === note.tagId);
    const color = colors?.find(c => c.id === tag?.colorId);

    const getColorHex = (name) => {
        if (!name) return "#e0e0e0";
        switch (name) {
            case "Red": return "#ff4d4f";
            case "Green": return "#52c41a";
            case "Blue": return "#028DFF";
            case "Yellow": return "#faad14";
            case "Purple": return "#722ed1";
            default: return "#ccc";
        }
    };

    const colorHex = getColorHex(color?.name);

    const hasRealImage = note.imageUrl || note.imageUri || note.photoUrl;
    const imageSrc = hasRealImage ? (note.imageUrl || note.imageUri || note.photoUrl) : null;
    const uniqueSeed = note.id || note.title || 'default-note';

    const getFormattedDate = () => {
        const dateValue = note.createdAt || note.createdDate || note.date;
        if (!dateValue) return "—";
        const dateObj = new Date(dateValue);
        if (isNaN(dateObj.getTime())) return "—";
        return dateObj.toLocaleDateString('ru-RU');
    };

    return (
        <div
            className="note-card"
            onClick={onClick}
            style={{ borderLeftColor: colorHex }}
        >
            <div className="note-card-image">
                {hasRealImage ? (
                    <img src={imageSrc} alt={note.title} className="note-img" />
                ) : (
                    <AbstractPattern seed={uniqueSeed} color={colorHex} />
                )}
            </div>

            <div className="note-card-body">
                <div className="note-card-header">
                    <h3 className="note-title">
                        {truncateTitle(note.title)}
                    </h3>
                    {tag && (
                        <span className="note-tag-badge" style={{ backgroundColor: colorHex }}>
                            {tag.name}
                        </span>
                    )}
                </div>

                <p className="note-content-preview">
                    {note.content?.substring(0, 100)}
                    {note.content?.length > 100 ? "..." : ""}
                </p>

                <div className="note-card-footer">
                    <span className="note-date">
                        {getFormattedDate()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Note;