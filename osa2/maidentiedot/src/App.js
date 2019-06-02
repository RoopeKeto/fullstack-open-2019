import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState(
      [
        {name: ""}
      ]
  )
  const [filter, setNewFilter] = useState('')
  const [filteredMaatLKm, setFilteredMaatLkm] = useState(0)

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(response => {

        setCountries(response.data)
        console.log("asetettiin countries dataksi alla oleva")
        console.log(response.data)
      })
  }, [])

  const maat = countries.filter(country => country.name.indexOf(filter) != -1)
  console.log("maita on: ", maat)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filterCountries = () => {
    countries.filter()
  }


  return (
    <div>
      <Filter filter={filter} handleChange={handleFilterChange} />
      
      <Maat maat={maat} filter={filter}/>
      <div>
        debugging:
      <MaanTiedot maat={maat} name="Finland"></MaanTiedot>
      </div>
    </div>
  )
}

const Maat = ({ maat, filter }) => {
  if (filter === ''){
    return(
      <div></div>
    )
  }

  if (maat.length >= 10){
    return (
      <div>Too many Matches, specify another filter</div>
    )
  }

  if ((maat.length < 10) && (maat.length > 1)){
    return (
      maat.map(maa => <div key={maa.name}>{maa.name}</div>)
    )
  }
  
  if (maat.length===1){
    return (
      <div>
        <p></p>
        <h1>{maat[0].name}</h1>
        <p></p>
        <div>capital {maat[0].capital}</div>
        <div>population {maat[0].population}</div>
        <p></p>
        <h2>languages</h2>
        <p></p>
        <ul>
          {maat[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={maat[0].flag} height="100" width="100"></img>
      </div>
    )
  }
  return (
    <div>Nothing was returned</div>
  )
}

const MaanTiedot = ({ maat, name }) => {
  const tilastotMaasta = maat.filter(maa => maa.name === name)[0]
  console.log("tilastot maasta", tilastotMaasta)
  return (
    <div>
      <p></p>
      <h1>{tilastotMaasta.name}</h1>
      <p></p>
      <div>capital {tilastotMaasta.capital}</div>
      <div>population {tilastotMaasta.population}</div>
      <p></p>
      <h2>languages</h2>
      <p></p>
      <ul>
        {tilastotMaasta.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={tilastotMaasta.flag} height="100" width="100"></img>
    </div>
    
  )
}

const Filter = ({ filter, handleChange }) =>{
  return (
  <div>
    find countries{" "} 
    <input value={filter} onChange={handleChange} />
  </div>
  )
}

export default App;
