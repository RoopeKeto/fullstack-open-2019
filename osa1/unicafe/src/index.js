import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header h1="give feedback"/>
			<Button handleClick={() => setGood(good+1)} text="good" />
			<Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
			<Button handleClick={() => setBad(bad+1)} text="bad" />
			<Header h1="statistics"/>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
  )
}

const Header = ({h1}) => {
	return (
		<div>
			<h1>{h1}</h1>
		</div>
	)
}

const Button = ({ handleClick, text }) => {
	return (
			<button onClick={handleClick}>
				{text}
			</button>
	)
}

const Statistics =({ good, neutral, bad}) => {
	const sumYhteensa = good*1 +neutral*0 + bad*(-1) 
	const lkmYhteensa = good + neutral + bad
	const positive = (good / lkmYhteensa) *100 + " %"

	if (lkmYhteensa > 0){
		return (
			<table>
				<tbody>
					<Statistic text="good" value={good} />
					<Statistic text="neutral" value={neutral} />
					<Statistic text="bad" value={bad} />
					<Statistic text="all" value={lkmYhteensa} />
					<Statistic text="average" value={sumYhteensa / lkmYhteensa} />
					<Statistic text="positive" value={positive} /> 
				</tbody>
			</table>
		)
	} 

	return <div>No feedback given</div>
}

const Statistic = ({ text, value }) => {
	console.log(text,value)
	return (
		<tr>
			<td width="50">{text}</td>
			<td width="200">{value}</td>
		</tr>
	)
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)