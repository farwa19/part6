const baseUrl = 'http://localhost:3000/anecdotes'

export const getAnicdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anicdote')
  }
 
  return await response.json()
}

export const createAnicdote = async (newAnicdote) => {
  console.log(newAnicdote.content.length < 5 )
 if (newAnicdote.content.length < 5) {
    throw new Error('Too short anecdote, must be at least 5 characters long')
  }
  

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAnicdote)
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create anicdote')
  }

  return await response.json()
}

export const updateAnicdote = async (updatedAnicdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnicdote)
  }

  const response = await fetch(`${baseUrl}/${updatedAnicdote.id}`, options)

  if (!response.ok) {
    throw new Error('Failed to update note')
  }

  return await response.json()
}