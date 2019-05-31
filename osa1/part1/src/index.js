import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const nimi = 'pekka'
  const ika = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Eveliina" age = {10+15} />
      <Hello name="Elsi"/>
      <Hello name={nimi} age={ika} />
    </>
  )

}

const Hello = (props) => {
  const now = new Date()
  return (
    <div>
      <p>Moro {props.name}! Iältään {props.age}. Nyt on päivä: {now.toString()}</p>
      <p>Hello world! Clock is in britan </p>
      <p>Guten tag den welt!</p>
    </div>
  )
}




ReactDOM.render(<App />, document.getElementById('root'));
