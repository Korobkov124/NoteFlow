import NotePng from "/src/assets/note.png";
import "./Note.css";

const Note = ({ note, tags, colors, onClick }) => {
    const tag = tags?.find(t => t.id === note.tagId);
    const color = colors?.find(c => c.id === tag?.colorId);

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

    return (
        <div className="note" onClick={onClick}>
            <div className="note-content">

                <div className="header-note">
                    <p className="note-type-left">{note.title}</p>
                    <p className={`note-type-right ${getColorClass(color?.name)}`}>{tag?.name}</p>
                </div>

                <div className="main-note-content">
                    <p>{note.content}</p>
                </div>

                <div className="photo-note">
                    <img src={NotePng} alt="photo-note" />
                </div>

            </div>
        </div>
    );
};

export default Note;