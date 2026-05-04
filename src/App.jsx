import { useState, useEffect } from 'react'
// import './App.css'
import axios from 'axios'
import debounce from 'lodash.debounce'

function App() {
  const [counters, setcounters] = useState([])

  useEffect(() => {
    axios.get('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
      .then(response => {
        setcounters(response.data)

      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  } ,[])



  const handleChange = (event) => {
    debounce(() => {
      const searchTerm = event.target.value.toLowerCase()
      const filteredCounters = counters.filter(counter =>
        counter.common.toLowerCase().includes(searchTerm)
      )
      setcounters(filteredCounters)
    }, 300)
  }
  return (
    <>
    <input type="text" onChange={handleChange} />
      {counters.map((counter , index) => (
        <div  key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '16px' }} >
          <img src={counter.png} alt={`${counter.common} flag`}  />
          <p >{counter.common}</p>
        </div>
      ))}
    </>
  )
}

export default App
