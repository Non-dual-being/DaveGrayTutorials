// add imports
import { useGetTodosQuery } from '../api/apiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery();

    

    const handleSubmit = (e) => {
        e.preventDefault();
        //addTodo
        setNewTodo('')
    }

    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>


    let content;
    // Define conditional content

    if (isLoading){
        content = <p>Loading ...</p>
    } else if (isSuccess && todos?.length){
        content = todos.map(todo => 
            <section key={todo.id}>
                <ul>
                    {
                        Object.entries(todo).map(([key, value]) => (
                            <li key={key}><strong><span>{key}</span></strong> : <span>{String(value)}</span></li>
                        ))
                    }
                </ul>
            </section>
        )
    } else if (isError){
        content = <p>Error: {error}</p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}
export default TodoList