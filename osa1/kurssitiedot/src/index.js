import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
			<Header course={course} />
      <Content content1={part1} content2={part2} content3 ={part3} 
              harjoitus1={exercises1} harjoitus2={exercises2} harjoitus3={exercises3}/>
      <Total harjoitus1={exercises1} harjoitus2={exercises2} harjoitus3={exercises3}/>
		</div>
	)
}

const Header = (props) => {
	return (
    <div>
			<h1>{props.course}</h1>
    </div>

		)
}

const Content = (props) => {
	return (
    <div>
      <Part content={props.content1} harjoitus={props.harjoitus1} />
      <Part content={props.content2} harjoitus={props.harjoitus2} />
      <Part content={props.content3} harjoitus={props.harjoitus3} />
    </div>
	)
}

const Part = (props) => {
  return (
    <div>
      <p>{props.content} {props.harjoitus}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.harjoitus1 + props.harjoitus2 + props.harjoitus3} </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

