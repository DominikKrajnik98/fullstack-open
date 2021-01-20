import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({name, handeClick}) =>{
  return(
    <button onClick={handeClick}>
      {name}
    </button>
  )
}

const Statistics = ({good, neutral, bad,total,average,positive}) =>{
  if(good !== 0 || neutral !== 0 || bad !== 0){
    return(
      <table>
        <Statistic name='good' count={good}/>        
        <Statistic name='neutral' count={neutral}/>
        <Statistic name='bad' count={bad}/>
        <Statistic name='all' count={total}/>
        <Statistic name='average' count={average}/>
        <Statistic name='positive' count={positive}/>
      </table>
    )
  }
  return(
    <div>
      No feedback given!
    </div>
  )
}

const Statistic = ({name,count}) =>{
  return(
    <tr>
      <td>{name}</td>
      <td>{count}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  const total = () => {return good + neutral + bad}
  const average = () =>{
    return ((good + bad * -1)/total())
  }
  const positive = () => {
    return good/total()
  }

  return (
    <div>
      <h1>
        Give feedback!
      </h1>
      <Button name='good' handeClick={handleGood}/>
      <Button name='neutral' handeClick={handleNeutral}/>
      <Button name='bad' handeClick={handleBad}/>
      <h1>
        Statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total()} average={average()} positive={positive()}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)