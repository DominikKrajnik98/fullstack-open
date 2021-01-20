import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value,handler}) => {
  return(
    <div><input value={value} onChange={handler}/></div>
  )
}

const Countries = ({countries,detalisHandler}) => {
  if(countries.length>10){
    return(
      <div>Too many matches! Filter more!</div>
    )}
  else if(countries.length === 1){
    const country = countries[0]
    return(
      <DetailedInfo country={country}/>
    )
  }
  else{
    return(
      <ul>
        {
          countries.map(country => {
            if(country.displayDetails === false){
              return(
                <li key={country.name}>
                  {country.name}
                  <CountryButton key={country.name + " button"} name={country.name} handler={()=>detalisHandler(country.name)}/>
                </li>)
                }else{
                  return(
                    <div>
                      <DetailedInfo key={country.name} country={country}/>
                      <CountryButton key={country.name + " button"} name={country.name} handler={()=>detalisHandler(country.name)}/>
                    </div>
                  )
                }
            })
        }
      </ul>
    )
  }
}

const CountryButton = ({handler}) => {
  return(
    <button onClick={handler}>show</button>
  )
}

const DetailedInfo = ({country}) => {
  return(
    <div>
        <h2> {country.name}</h2>
        capital {country.capital}
        <br/>
        population {country.population}
        <h2>languages</h2>
        <ul>
          {
            country.languages.map( language => <li key={language.name}>{language.name}</li>)
          }
        </ul>
        <img src={country.flag} alt={country.name} width="400" height="200"/>
      </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [termToFilter, setTermToFilter] = useState('')
  const hook = () =>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const tmp = response.data.map(country => {
          return {...country,'displayDetails': false}
      })
        console.log(tmp);
        setCountries(tmp)
      })
  }

  useEffect(hook,[])

  const handleSerach = (event) => {
    setTermToFilter(event.target.value)
  }

  const hadnleDetails = (name) => {
    console.log("im here!",name);
    const tmp = countries.map(country => {
      if(country.name === name)
        return {...country,'displayDetails':!country.displayDetails}
      return country
    })
    setCountries(tmp)
  }

  const countriesToDisplay = termToFilter ? countries.filter( country => country.name.toLowerCase().includes(termToFilter.toLowerCase())) : countries

  return (
    <div>
      find countries
      <Filter value={termToFilter} handler={handleSerach}/>
      <Countries countries={countriesToDisplay} detalisHandler={hadnleDetails}/>
    </div>
  );
}

export default App;
