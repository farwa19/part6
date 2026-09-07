import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnicdotes, createAnicdote, updateAnicdote} from '../requests'
import { useNotificationDispatch }  from '../components/NotificationContext'
export const useAnicdote = () => {
  
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  

  const result = useQuery({
    queryKey: ['anicdotes'],
    queryFn: getAnicdotes,
    refetchOnWindowFocus: false
  })

 const newAnicdoteMutation = useMutation({
    mutationFn: createAnicdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anicdotes'] })
      dispatch("An anicdote was created")
      setTimeout(() => {
        dispatch(null)
      }, 5000)
    },
    onError: (error) => {
      
      
      dispatch(error.message)
      setTimeout(() => {
        dispatch(null)
      }, 5000)
    }
  })

  const updateAnicdotesMutation = useMutation({
    mutationFn: updateAnicdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anicdotes'] })
      console.log(updatedAnecdote)
      dispatch(`Anecdote '${updatedAnecdote.content}' voted`)
      setTimeout(() => {
        dispatch(null)
      }, 5000)
     
      
    }
  })

  return {
    anicdotes: result.data || [],
    isPending: result.isPending,
    isError: result.isError,
     addAnicdote: (content) =>
      newAnicdoteMutation.mutate({
        content,
        votes: 0
      }),

    
      updateAnicdote: (anicdote) =>
      updateAnicdotesMutation.mutate({
        ...anicdote,
        votes: anicdote.votes + 1
      })
      
  }
}