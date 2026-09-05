import { create } from 'zustand'
import axios from 'axios'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  votes: 0
})

const notify = (message) => {
  if (!message) return; // If message is null or undefined, do nothing
  useAnecdoteStore.setState({ notification: message });
  setTimeout(() => {
    useAnecdoteStore.setState({ notification: null });
  }, 5000);
};

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  notification: null,
  filter: '',

  initAnecdotes: async () => {
    const response = await axios.get("http://localhost:3001/anecdotes");
    console.log("Fetched anecdotes from server:", response.data);
    set({ anecdotes: response.data });
  },

  vote: async (id) => {
    console.log(id);
    // 1. Find the target anecdote and increment its votes locally
    const target = get().anecdotes.find((anecdote) => anecdote.id === id);
    console.log(`Found anecdote with id ${id}:`, target);
    const updatedAnecdote = { ...target, votes: target.votes + 1 };
    console.log(`Incremented votes for anecdote with id ${id} locally.`);
    console.log(`Updated anecdote:`, updatedAnecdote);

    // 2. Send the update to the server first
    console.log(`Sending updated anecdote with id ${id} to the server...`);
    await axios.put(`http://localhost:3001/anecdotes/${id}`, updatedAnecdote);
    console.log(`Updated anecdote with id ${id} on the server.`);

    // 3. Update the Zustand state with the new list
    set((state) => ({
      anecdotes: state.anecdotes.map((anecdote) =>
        anecdote.id === id ? updatedAnecdote : anecdote
      ),
    }));
    // send notig=fication
    notify(`you voted '${updatedAnecdote.content}'`);
  },

  addAnecdote: async (content) => {
    const newAnecdote = asObject(content);
    
    
    const response = await axios.post("http://localhost:3001/anecdotes", newAnecdote);
    
    set((state) => ({
      anecdotes: [...state.anecdotes, response.data],
    }));
    notify(`You added a new anecdote: "${content}"`);
    
  },
 deleteAnecdote: async (id) => {
    const anecdote = get().anecdotes.find((a) => a.id === id);
    
    if (anecdote && anecdote.votes > 0) {
      notify(`You cannot delete an anecdote with votes greater than 0.`);
      return;
    }

    await axios.delete(`http://localhost:3001/anecdotes/${id}`);
    set((state) => ({
      anecdotes: state.anecdotes.filter((a) => a.id !== id),
    }));
    notify(`You deleted the anecdote with id: "${id}"`);
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);

  return anecdotes
    .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
    .toSorted((a, b) => b.votes - a.votes);
};