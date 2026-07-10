import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchForm from './SearchForm'
import { searchCities } from '../api/weatherApi'

function Search() {
  /* Elevation state */
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  /* Questa funzione viene passata a SearchForm come prop onSearch. Riceve il testo digitato e nel genitore, avviene la chiamata API vera e propria. */
  
  async function handleSearch(cityName) {
    setLoading(true)
    setError('')
    setResults([])

    try {
      const cities = await searchCities(cityName)

      if (cities.length === 0) {
        setError('Nessuna città trovata con questo nome.')
      }

      setResults(cities)
    } catch {
      setError('Si è verificato un errore durante la ricerca.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="search">
      <h2>Cerca una città</h2>
      <SearchForm onSearch={handleSearch} />

      {loading && <p>Ricerca in corso...</p>}
      {error && <p className="search-error">{error}</p>}

      <ul className="search-results">
        {results.map((city) => (
          <li key={`${city.lat}-${city.lon}`}>
            <Link
              to={`/citta/${city.lat}/${city.lon}?nome=${encodeURIComponent(city.name)}&paese=${encodeURIComponent(city.country)}`}
            >
              {city.name}
              {city.state ? `, ${city.state}` : ''} ({city.country})
            </Link>
          </li>
        ))}
      </ul>

      <div className="api-info">
        <h3>Come funziona la ricerca</h3>
        <p>
          Questa pagina usa la <strong>Geocoding API</strong> di{' '}
          <a href="https://openweathermap.org/api/geocoding-api" target="_blank" rel="noreferrer">
            OpenWeatherMap
          </a>
          : il nome della città che digiti viene inviato all'endpoint{' '}
          <code>/geo/1.0/direct</code>, che restituisce le coordinate
          (latitudine e longitudine) delle città corrispondenti. Cliccando su
          un risultato, quelle coordinate vengono usate nella pagina
          successiva per richiedere il meteo attuale tramite l'endpoint{' '}
          <code>/data/2.5/weather</code>.
        </p>
      </div>
    </section>
  )
}

export default Search
