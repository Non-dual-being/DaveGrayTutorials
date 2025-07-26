import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNotebyId } from './notesApiSlice'
import { selectAllusers } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'

const EditNote = () => {
  const { id } = useParams();

  const note = useSelector(state => selectNotebyId(state, id));
  const users = useSelector(selectAllusers);

  /**
   * !niet useSelector(selectAllusers()
   * todo de bedoeling is dat useSelector dit zelf doe en dat je de referentie meegeeft
   */

  const content = note && users ? <EditNoteForm note = {note} users = {users} /> : <p>Loading...</p>
    
  return content;
}

export default EditNote