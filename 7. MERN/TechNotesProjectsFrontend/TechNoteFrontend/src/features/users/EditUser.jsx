import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserbyId } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  const user = useSelector(state => selectUserbyId(state, id));

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

  return content;
}

export default EditUser

/**
 * use the extra step to ensure that the user is there to extra the fields from
 */