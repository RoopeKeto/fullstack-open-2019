import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState(
      [
        {name: ""}
      ]
  )
  const [filter, setNewFilter] = useState('')
  //const [filteredMaatLKm, setFilteredMaatLkm] = useState(0)

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(response => {

        setCountries(response.data)
      })
  }, [])

  const maat = countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <Maat maat={maat} filter={filter} setNewFilter={setNewFilter}/>
    </div>
  )
}



//-------------- Komponentit appiin -----------------

const Maat = ({ maat, filter, setNewFilter }) => {
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
      maat.map(maa => <div key={maa.name}>
        {maa.name}
        <button onClick={() => console.log(setNewFilter(maa.name))}>show</button>
        </div>)
    )
  }
  
  if (maat.length===1){
    return (
     <MaanTiedot maat={maat} name={maat[0].name}></MaanTiedot>
    )
  }
  return (
    <div>Nothing was returned</div>
  )
}

const MaanTiedot = ({ maat, name }) => {
  const [saaTiedot, setSaaTiedot] = useState({})
  const [condition, setCondition] = useState({})

  const tilastotMaasta = maat.filter(maa => maa.name === name)[0]

  useEffect(() => {
    axios.get(`https://api.apixu.com/v1/current.json?` +
      `key=e3fe9d8645f648a490182130190806&q=${tilastotMaasta.capital}`)
      .then(response => {
        setSaaTiedot(response.data.current)
        setCondition(response.data.current.condition)     
      })
  }, [])

  if (typeof tilastotMaasta=== 'undefined' || typeof condition.icon === 'undefined'){
    return null
  }

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
      <img alt="lippu" src={tilastotMaasta.flag} height="100" width="100"></img>
      <div>
        <h2>Weather in {tilastotMaasta.capital}</h2>
        <p><strong>temperature: </strong>{saaTiedot.temp_c} Celsius</p>
        <img alt="Milta saa näyttää" src={`https:${condition.icon}`} width="65" height="65"></img>
        <p><strong>wind: </strong>{saaTiedot.wind_kph} kph direction {saaTiedot.wind_dir}</p>
      </div>

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
