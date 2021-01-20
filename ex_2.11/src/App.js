import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({termToFilter,handleFilterChange}) => {
  return(<div>filter shwon with <input value={termToFilter} onChange={handleFilterChange}/></div>)
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
const Persons = ({personsToShow}) => {
  return(personsToShow.map(person => 
    <div key={person.name}>
      {person.name} {person.number}
    </div>))
}
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [termToFilter, setTermToFilter] = useState('')

  const hook = () =>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook,[])

  const personsToShow = termToFilter ? persons.filter( (person) => person.name.toLowerCase().includes(termToFilter.toLowerCase())) : persons

  const addPerson = (event) => {
    event.preventDefault()
    persons.find((person)=> person.name === newName) ? alert(`${newName} is alredy added to phonebook`) : setPersons(persons.concat({name:newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setTermToFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter termToFilter={termToFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add new</h2>
      <PersonForm name={newName} number={newNumber}  formSubmition={addPerson} nameHandler={handleNameChange} numberHandler={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App