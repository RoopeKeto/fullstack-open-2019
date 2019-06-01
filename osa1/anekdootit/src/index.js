import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [taulu, setTaulu] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))
  
  const length = anecdotes.length
  let tauluKopio = []

  const randomlySelected = () => {
    setSelected(Math.floor(Math.random() * length))

  }

  const aanestys = () => {
    tauluKopio = [ ...taulu]
    tauluKopio[selected] = tauluKopio[selected] + 1
    setTaulu(tauluKopio)
  }
  
  const enitenAania = (jokinTaulu) => {
    let maksimi = 0;
    let maksiminIndeksi = 0;
    for (let i=0; i< length;i++){
      if (taulu[i] > maksimi){
        maksimi = taulu[i]
        maksiminIndeksi = i
      }
    }
    return maksiminIndeksi
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {taulu[selected]} votes</p>
      <button onClick={aanestys}>vote</button>
      <button onClick={randomlySelected}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[enitenAania(taulu)]}</p>
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