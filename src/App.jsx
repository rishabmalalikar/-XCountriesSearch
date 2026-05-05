import { useState, useEffect } from 'react'
// import './App.css'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { useMemo } from "react";
function App() {
 
  const [allCountries, setAllCountries] = useState([])
const [counters, setcounters] = useState([])

  useEffect(() => {
    axios.get('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
      .then(response => {
        setAllCountries(response.data)
setcounters(response.data)

      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  } ,[])


const debouncedSearch = useMemo(() =>
  debounce((value) => {
    const searchTerm = value.toLowerCase()

    const filtered = allCountries.filter(country =>
      country.common.toLowerCase().includes(searchTerm)
    )

    setcounters(filtered)
  }, 300)
, [allCountries])




  const handleChange = (e) => {
    debouncedSearch(e.target.value)
  }


  useEffect(() => {
  return () => {
    debouncedSearch.cancel();
  };
}, [debouncedSearch]);
  return (
    <div 
  key={index} 
  className="countryCard"
  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '16px' }}
>
    <input type="text" onChange={handleChange} />
      {counters.map((counter , index) => (
        <div  key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '16px' }} >
          <img src={counter.png} alt={`${counter.common} flag`}  />
          <p >{counter.common}</p>
        </div>
      ))}
    </div>
  )
}




export default App
