import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";


const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    const errorMsg = error.data.message?.length 
      ? error.data.message
      : "unkown error in loading notes";

    content = <p className="errmsg">Error: {errorMsg}</p>;
  }

  if (isSuccess){
    const {ids, message } = notes;

    const tableContent = ids?.length
      ? ids.map(noteId => <Note key={noteId} noteId = {noteId} />)
      : null;

    content = (
      <table className="table table--notes"> 
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">Status</th>
            <th scope="col" className="table__th note__created">Created</th>
            <th scope="col" className="table__th note__updated">Updated</th>
            <th scope="col" className="table__th note__title">Title</th>
            <th scope="col" className="table__th note__username">Owner</th>
            <th scope="col" className="table__th note__edit">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
            {
            message &&            
            (
              <tr className="table__row message">
                <td  className="table__message">{message}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    )

    return content;

  }




} 

export default NotesList