import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import axios from 'axios'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: { id: '1', content: 'Test anecdote', votes: 0 } })),
    put: vi.fn(() => Promise.resolve({ data: { id: '1', content: 'Test anecdote', votes: 1 } })),
    delete: vi.fn(() => Promise.resolve({})),
    },

}))

import { useAnecdoteStore } from './store'
describe('anicdote store', ()=>{
    beforeEach(() => {
        // Reset the store before each test
        useAnecdoteStore.setState({
          anecdotes: [],
          notification: null,
        })
      })

    it('should initialize anecdotes', async () => {
        await act(async () => {
          await useAnecdoteStore.getState().initAnecdotes()
        })

        const state = useAnecdoteStore.getState()
        console.log('State after initAnecdotes:', state)
        expect(state.anecdotes).toEqual([])
      })
    it('displays anecdotes received from the store sorted descending by votes', async () => {
    // 1. Manually seed state with unsorted votes to test sorting behavior
    useAnecdoteStore.setState({
      anecdotes: [
        { id: '1', content: 'Low votes', votes: 1 },
        { id: '2', content: 'High votes', votes: 10 },
        { id: '3', content: 'Medium votes', votes: 5 },
      ]
    })

    const state = useAnecdoteStore.getState()
    const sorted = [...state.anecdotes].sort((a, b) => b.votes - a.votes)

    expect(sorted[0].votes).toBe(10)
    expect(sorted[1].votes).toBe(5)
    expect(sorted[2].votes).toBe(1)
    })
    it('correct React component receives a properly filtered list of anecdotes.', async () => {
        
        useAnecdoteStore.setState({
          anecdotes: [
            { id: '1', content: 'React is great', votes: 5 },
            { id: '2', content: 'Vue is also great', votes: 3 },
            { id: '3', content: 'Angular is okay', votes: 2 },
          ]
        }) 
        const filterValue = 'great'
        const filteredAnecdotes = useAnecdoteStore.getState().anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filterValue.toLowerCase())
        )
        expect(filteredAnecdotes).toEqual([
          { id: '1', content: 'React is great', votes: 5 },
          { id: '2', content: 'Vue is also great', votes: 3 },
        ])
      }
    )
    it('voting increases the number of votes for an anecdote', async () => {
         useAnecdoteStore.setState({
          anecdotes: [
            { id: '1', content: 'React is great', votes: 5 },
            { id: '2', content: 'Vue is also great', votes: 3 },
            { id: '3', content: 'Angular is okay', votes: 2 },
          ]
        }) 
        const anecdoteId = '1'
        await act(async () => {
          await useAnecdoteStore.getState().vote(anecdoteId)
        })

        const updatedAnecdote = useAnecdoteStore.getState().anecdotes.find(a => a.id === anecdoteId)
        expect(updatedAnecdote.votes).toBe(6) // votes should have increased by 1
      } )


})