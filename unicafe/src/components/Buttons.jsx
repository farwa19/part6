import { useCounterStore } from '../store'
const Buttons = () => {
  const goodClick = useCounterStore(state => state.goodClick)
  const neutralClick = useCounterStore(state => state.neutralClick)
  const badClick = useCounterStore(state => state.badClick)
  return (
    <div>
    <h2>give feedback</h2>
     
      <button onClick={goodClick}>good</button>
      <button onClick={neutralClick}>neutral</button>
      <button onClick={badClick}>bad</button>
      </div>
  )
}

export default Buttons
