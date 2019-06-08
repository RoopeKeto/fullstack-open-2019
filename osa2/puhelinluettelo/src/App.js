import React, { useState, useEffect} from 'react'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([{name:"Unknown", number:1234567890}]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errorNotification, setErrorNotification ] = useState(null)

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
          setNotification(`Added ${storedPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
    }  else {
      // Message for updating
      const message = `${newName} is already added to phonebook, 
        replace the old number with a new one?`
      const result = window.confirm(message)
      // If yes user want's to update
      if (result === true){
        const personWithNewNumber = {
          name: newName,
          number: newNumber
        }

        const idOfPersonToUpdate = persons.filter(person => {
          return person.name === personWithNewNumber.name
        })[0].id

        personService
          .update(idOfPersonToUpdate, personWithNewNumber)
          .then((updatedPerson) => {
            const personsUpdated = () => {
              return  (
                persons
                  .filter(person => person.id !== idOfPersonToUpdate)
                  .concat(updatedPerson)
              )
            }
            setPersons(personsUpdated)
            setNewName("")
            setNewNumber("")
            setNotification(`Updated number of ${updatedPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 2000)
          }
          ).catch(error => {
            setErrorNotification(`Information of ${personWithNewNumber.name} has already been removed from server`)
            setPersons(persons.filter(person => person.id !== idOfPersonToUpdate))
            setTimeout(() => {
              setErrorNotification(null)
            }, 2000)
          })
      }
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

      <Notification message={notification} />
      <ErrorNotification message={errorNotification} />

      <Filter filter={newFilter} handleChange={handleFilterChange} />      

      <h3>add a new</h3>
      <PersonForm addingFunction={add} onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange} name={newName}  number={newNumber} />

      <h2>Numbers</h2>
      <Persons setNotification={setNotification} persons={persons} filter={newFilter} setFunction={setPersons} />

    </div>
    
  )

}
const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="errorNotification">
      {message}
    </div>
  )
}


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}


const Persons = ({persons, filter, setFunction, setNotification}) => {
  
  const handleClickOfRemoval = (idToBeRemoved) => {
    const personToBeRemoved = persons
      .find(person => person.id === idToBeRemoved).name

    const result = window.confirm(`delete ${personToBeRemoved} ?`);
    
    if (result===true){
      personService
      .remove(idToBeRemoved)
      .then(() => {
        setFunction(persons.filter(person => person.id !== idToBeRemoved))
        
        setNotification(`Removed ${personToBeRemoved}`)
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
    }
  }

  return (
    <div>
    {persons
      .filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
      .map(person => {
        return (
          <div >
            <p>{person.name} {person.number}
            <button key={person.id} onClick={() => handleClickOfRemoval(person.id)}>DELETE</button>
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