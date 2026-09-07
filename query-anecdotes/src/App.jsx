import { useState } from 'react'
import { useAnicdote } from './hooks/newanicdote'
import { Notification } from './components/NotificationContext' // Import the display component

const App = () => {
  const { updateAnicdote, anicdotes, isError, isPending, addAnicdote: addAnicdoteToServer, deleteAnicdote } = useAnicdote()
  const [filter, setFilter] = useState('')

  const addAnicdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnicdoteToServer(content)
  }

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  // Filter and sort anecdotes descending by votes
  const filteredAnecdotes = anicdotes
    .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      
      {/* Render the Notification component here */}
      <Notification />

      <div>
        filter <input data-testid="filter" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <h2>create new</h2>
      <form onSubmit={addAnicdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>

      {filteredAnecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            <span>has {anecdote.votes}</span>
            <div>
              <button name="vote" onClick={() => updateAnicdote(anecdote)}>
                vote
              </button>
            </div>
            {anecdote.votes === 0 && deleteAnicdote && (
              <button onClick={() => deleteAnicdote(anecdote.id)}>delete</button>
            )}
          </div>
        </li>
      ))}
    </div>
  )
}

export default App