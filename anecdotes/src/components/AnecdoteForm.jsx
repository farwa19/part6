import { useAnecdotes,useAnecdoteStore } from "../store"
const AnecdoteForm = () => {
     const anecdotes = useAnecdotes()
     const addAnecdote = useAnecdoteStore((state) => state.addAnecdote)
  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target[0].value
    addAnecdote(content)
  } 
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote"  data-testid="new" />
        </div>
         <button>create </button>
      </form>
    </div>
    )  }
export default AnecdoteForm