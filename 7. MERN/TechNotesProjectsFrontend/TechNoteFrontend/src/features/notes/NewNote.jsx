import { useSelector } from "react-redux"
import { selectAllusers } from '../users/usersApiSlice'
import NewNoteForm  from './NewNoteForm'
import { Link } from 'react-router-dom'


const NewNote = () => {
  const users = useSelector(selectAllusers);

  const content = users?.length 
      ? <NewNoteForm users={users} />
      : <p>No users found, create a user first to create a note: <Link to="../users/new"><span>Create a user</span></Link></p>

  return content;

}

export default NewNote