import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({clickHandler, text}) =>{
  return(
    <button onClick={clickHandler}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [maxVotes, setMaxVotes] = useState(0)
  const [votes,setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  const nextAnecdote = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))
  const voteForAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    countMaxVotes(copy)
  }
  const countMaxVotes = (array) =>{
    let i = 0
    let max = [0,array[0]]
    while(i<array.length){
      if(max[1]<array[i]){
        max[0]=i
        max[1]=array[i]
      }
      i++
    }
    setMaxVotes(max[0])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br/>
      Has {votes[selected]} votes
      <br/>
      <Button clickHandler={nextAnecdote} text="Get another anecdote!"/>
      <Button clickHandler={voteForAnecdote} text="Vote"/>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[maxVotes]}
      <br/>
      Has {votes[maxVotes]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)