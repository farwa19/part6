import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnicdotes, createAnicdote, updateAnicdote} from '../requests'

export const useAnicdote = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anicdotes'],
    queryFn: getAnicdotes,
    refetchOnWindowFocus: false
  })

 const newAnicdoteMutation = useMutation({
    mutationFn: createAnicdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anicdotes'] })
    }
  })

  const updateAnicdotesMutation = useMutation({
    mutationFn: updateAnicdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anicdotes'] })
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