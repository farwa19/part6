import { useAnecdotes, useAnecdoteStore } from "../store"
import { useEffect } from 'react';
const AnecdoteList = () => {
 const anecdotes = useAnecdotes();
  const initAnecdotes = useAnecdoteStore((state) => state.initAnecdotes);
  const vote = useAnecdoteStore((state) => state.vote);
  const deleteAnecdote = useAnecdoteStore((state) => state.deleteAnecdote);
  

  useEffect(() => {
    initAnecdotes();
  }, [initAnecdotes]);
 
  const vote_SORTED = [...anecdotes].sort((a, b) => b.votes - a.votes);
  return (
    <>
    <input name="filter" data-testid="filter" onChange={(e) => {
      const filterValue = e.target.value.toLowerCase();
      const filteredAnecdotes = anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filterValue)
      );
      // Update the anecdotes state with the filtered anecdotes
      useAnecdoteStore.setState({ anecdotes: filteredAnecdotes });
    }} />
      {vote_SORTED.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
        {anecdote.votes === 0 && (
  <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
)}
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList