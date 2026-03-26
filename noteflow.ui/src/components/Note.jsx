import NotePng from "/src/assets/note.png";
import "./Note.css";

const Note = ({ onClick }) => {
    return (
        <div className="note" onClick={onClick}>
            <div className="note-content">

                <div className="header-note">
                    <p className="note-type-left">Проект</p>
                    <p className="note-type-right">Работа</p>
                </div>

                <div className="main-note-content">
                    <p>Разработать техническое задание</p>
                </div>

                <div className="photo-note">
                    <img src={NotePng} alt="photo-note" />
                </div>

            </div>
        </div>
    );
};

export default Note;