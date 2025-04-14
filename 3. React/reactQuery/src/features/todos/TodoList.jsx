import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../../api/TodosApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faUpload} from  "@fortawesome/free-solid-svg-icons"
import { useState } from "react"


const TodoList = () => {
    const [newToDo, setNewToDo] = useState("");
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        error,
        data: todos //object destruering, je hernooemt data naar todos
    } = useQuery({
        //zelf gekozen naam om de data die wordt bewaarde in React Query Caching te benoemen
        queryKey: ['todos'],
        queryFn: getTodos, //query verwacht hier altijd een functie met een promise in de return
        select: data => data.sort((a, b) => b.id - a.id )
      })

      /**
       * je vangt de waarden op van useQueryy middels object destruering, anders doe je result = useQuery({}) en dan result.isLoading
       * bij axios worden de fouten vanzelf gegeven, als je een fethch doet dan moet je in FETCH zelf de foutafhandeing doen
       * Query is dus afhankelijk van de functie die jij aanlevert en haalt in principe alleen info op, dus als je een fout maatk in fetch dan gaat het hier ook fout
       */
    
      const addToDoMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
      });
    
      const updateToDoMutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
      });
    
      const deleteToDoMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] });
          //je vertelt een query de cacche is verouders en haal bij de volgende render de data weer op
        },
      });
    

    const handleSumbit = (e) => {
        e.preventDefault()
        addToDoMutation.mutate({ userId: 1, title: newToDo, completed: false})
        setNewToDo('');
    }

    const newItemSection = (
        <form onSubmit={handleSumbit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input 
                    type="text" 
                    id="new-tood"
                    value={newToDo}
                    onChange={(e)=> {setNewToDo(e.target.value)}}
                    placeholder="Enter something to do"  
                />
            </div>
            <button className="sumbit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    )

    let content;

    if (isLoading) {
        content = <p> Loading ....</p>
    } else if (isError) {
        content = <p> Error {error}</p>
    } else {
        content = todos.map((todo) => {
          return (
            <article key={todo.id}>
              <div className="todo">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  id={todo.id}
                  onChange={() => 
                    updateToDoMutation.mutate({...todo, completed: !todo.completed})}  
                />
                <label htmlFor={todo.id}>{todo.title}</label>
              </div>
              <button 
                className="trash"
                onClick={() => {deleteToDoMutation.mutate({id: todo.id})}}
              >
                <FontAwesomeIcon icon={faTrash}/>
              </button>
            </article>
          )
        })
    }

    return (
        <main>
            <h1>To Do list</h1>
            {newItemSection}
            {content}
        </main>
    )

}

export default TodoList

/**
 * 🔄 React Query gedrag bij useQuery()
 *
 * ✅ useQuery() wordt bij elke render van de component opnieuw aangeroepen,
 *    maar dat betekent **niet** dat er elke keer een nieuwe fetch gebeurt.
 *
 * 🧠 React Query werkt met caching en een "stale" systeem:
 * 
 * 1. Heeft het een verse cache voor deze queryKey?
 *    → Gebruik cache, geen nieuwe fetch.
 *
 * 2. Is de data “stale”?
 *    → Trigger een automatische refetch op de achtergrond.
 *
 * 3. Is er nog geen data?
 *    → Fetch direct.
 *
 * 🔁 Wat betekent "stale"? → Of de data nog "vers" genoeg is.
 *    Dit wordt bepaald door de optie `staleTime` (standaard = 0 ms):
 *
 *    staleTime: 1000 * 60 * 5 // data blijft 5 minuten vers
 *
 *    Als je `staleTime` niet instelt, wordt data bijv. opnieuw opgehaald:
 *    - bij focus op het browservenster
 *    - bij reconnect na offline
 *    - of bij elke her-mount
 *
 * 💡 Tip: Voeg zelf staleTime toe om over-fetching te voorkomen.
 *
 * ❓ Wat doet `invalidateQueries({ queryKey })`?
 *    → Zet de status van de data handmatig op “stale”
 *    → Trigger automatisch een refetch **als die query actief is**
 *
 * 📦 Je kunt ook handmatig de cache aanpassen met `setQueryData()`
 *    als je niet opnieuw wilt ophalen, maar direct wilt wijzigen.
 *
 * 🟢 Axios gooit automatisch een fout bij 404/500
 * 🔴 Fetch doet dat **niet**: je moet zelf throwen op `!response.ok`
 *
 * React Query kijkt alleen of de `queryFn()` Promise resolved of rejected.
 */
