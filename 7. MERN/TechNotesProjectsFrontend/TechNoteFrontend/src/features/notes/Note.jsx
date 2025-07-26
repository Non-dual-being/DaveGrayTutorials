import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNotebyId } from "./notesApiSlice";
import { selectUserbyId } from "../users/usersApiSlice";



const Note = ({ noteId }) => {
  const note = useSelector(state => selectNotebyId(state, noteId));
  const navigate = useNavigate();

  if (note){
    const created = new Date(note.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long'})
    const updated = new Date(note.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long'})

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    const user = useSelector(state => selectUserbyId(state, note.user));

    return (
        <tr className="table__row">
            <td className="table__cell note__status">
                {
                    note.completed
                        ?   <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                }
            </td>
            <td className="table__cell note__created">{created}</td>
            <td className="table__cell note__updated">{updated}</td>
            <td className="table__cell note__title">{note.title}</td>
            <td className="table__cell note__username">{user.username}</td>
            <td className="table__cell">
                <button
                    className="icon-button table__button"
                    onClick={handleEdit}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </td>
        </tr>
    )        

  } else return null;

}

export default Note