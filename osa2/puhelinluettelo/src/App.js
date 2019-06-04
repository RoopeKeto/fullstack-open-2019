import React, { useState, useEffect} from 'react'
import axios  from 'axios'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([{name:"Unknown", number:1234567890}]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then( storedPersons => {
        setPersons(storedPersons)
      })
    }, []
  )

  const add = (event) => {
    event.preventDefault()
    
    // getting the names as list from the persons list
    const names = persons.map(person => person.name)

    if (names.indexOf(newName) === -1) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      // lisätään nimi palvelimelle
      personService
        .create(personObject)
        .then( storedPerson => {
          setPersons(persons.concat(storedPerson))
          setNewName("")
          setNewNumber("")
        })

    } else {
      const message = `${newName} is already added to phonebook`
      window.alert(message)
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleChange={handleFilterChange} />      

      <h3>add a new</h3>
      <PersonForm addingFunction={add} onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange} name={newName}  number={newNumber} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />

    </div>
    
  )

}


const Persons = ({persons, filter}) => {
  const handleButtonClick = () => {
    
  }


  return (
    <div>
    {console.log(persons)}
    {persons
      .filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
      .map(person => {
        return (
          <div>
            <p key={person.id}>{person.name} {person.number}
            <button onClick={() => console.log("painoit minua")}>Olen painike</button>
            </p>
          </div>
        )
      })}
    </div>    
  )
} 

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addingFunction}>
      <div>
        name: 
        <input value={props.name} onChange={props.onNameChange}/>
      </div>
      <div>
        number: 
        <input value={props.number} onChange={props.onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
   </form>
  )


}
const Filter = ({ filter, handleChange }) =>{
  return (
  <div>
    filter shown with 
    <input value={filter} onChange={handleChange} />
  </div>
  )
}



export default App