import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './App.css'

const Notification = ({successMessage, errorMessage}) => {
  if(successMessage === null && errorMessage === null)
      return null
  return(
    <div>
      {
        (successMessage !== null 
        && 
        <div className="success">
            {successMessage}
        </div>)
        ||
        (errorMessage !== null 
        &&
        <div className="error">
          {errorMessage}
        </div>)
      }
    </div>
  )
}

const Filter = ({termToFilter,handleFilterChange}) => {
  return(<div>filter with <input value={termToFilter} onChange={handleFilterChange}/></div>)
}
const PersonForm = ({name,number,nameHandler, numberHandler, formSubmition}) => {
  return(<form onSubmit={formSubmition}>
        <div> name: <input value={name} onChange={nameHandler}/> </div>
        <div>number: <input value={number} onChange={numberHandler}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}
const Persons = ({personsToShow, deleteHandler}) => {
  return(personsToShow.map(person => 
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={() => deleteHandler(person)}>delete</button>
    </div>))
}
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [termToFilter, setTermToFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () =>{
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook,[])

  const personsToShow = termToFilter ? persons.filter( person => person.name.toLowerCase().includes(termToFilter.toLowerCase())) : persons

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find((person) => person.name === newName)
    person ? updatePerson(person) : createPerson()
  }
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setTermToFilter(event.target.value)
  const deletePerson = person => {
    if(window.confirm(`Are you sure that you want to delete ${person.name} number?`)){
      personsService
        .deletePerson(person.id)
        .then( () => {setPersons(persons.filter( personToCheck => personToCheck.id !== person.id ))})
    }
  }
  const createPerson = () => {
    const personObject = {
      name:newName, 
      number: newNumber
    }
    personsService
      .create(personObject)
      .then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage("Added " + returnedPerson.name)
        setTimeout(() => {
          setSuccessMessage(null)        
        }, 5000)
      })
  }
  const updatePerson = person => {
    if(window.confirm(`Are you sure that you want to replace old number of ${person.name}, with a new one ?`)){
      const personObject = {
        id: person.id,
        name: person.name,
        number: newNumber
      }
      personsService
        .put(person.id, personObject)
        .then(returnedPerson => {
          const updatedIndex = persons.findIndex(personToCheck => personToCheck.id === person.id)
          let updatedArray = [...persons]
          updatedArray[updatedIndex] = returnedPerson
          setPersons(updatedArray)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage("Information of " + person.name +" has already been removed from server")
          setTimeout(() => {
            setErrorMessage(null)        
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>
      <Filter termToFilter={termToFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add new</h2>
      <PersonForm name={newName} number={newNumber}  formSubmition={addPerson} nameHandler={handleNameChange} numberHandler={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteHandler={deletePerson}/>
    </div>
  )
}

export default App