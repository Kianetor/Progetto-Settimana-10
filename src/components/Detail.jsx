import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getWeatherByCoords, getForecastByCoords } from '../api/weatherApi'

/* l'API restituisce una previsione ogni 3 ore */
function groupForecastByDay(list) {
  const today = new Date().toISOString().split('T')[0]
  const days = {}

  for (const item of list) {
    const date = item.dt_txt.split(' ')[0]
    if (date === today) continue // il meteo di oggi è già mostrato nella card principale quindi continua

    if (!days[date]) days[date] = []
    days[date].push(item)
  }

  return Object.entries(days)
    .slice(0, 5)
    .map(([date, items]) => {
      const temps = items.map((item) => item.main.temp)
      const midday = items.find((item) => item.dt_txt.includes('12:00:00')) ?? items[0]

      return {
        date,
        min: Math.round(Math.min(...temps)),
        max: Math.round(Math.max(...temps)),
        icon: midday.weather[0].icon,
        description: midday.weather[0].description,
      }
    })
}

function Detail() {
  /* useParams legge i parametri della rotta, quindi (:lat/:lon) */
  
  const { lat, lon } = useParams()

  /* useSearchParams legge invece la stringa query, quindi dopo (?) */
  const [searchParams] = useSearchParams()
  const nome = searchParams.get('nome')
  const paese = searchParams.get('paese')

  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  /* useEffect parte ogni volta che lat/lon cambiano */
  useEffect(() => {
    setLoading(true)
    setError('')

    /* Meteo attuale e previsioni sono due chiamate indipendenti */
    Promise.all([getWeatherByCoords(lat, lon), getForecastByCoords(lat, lon)])
      .then(([weatherData, forecastData]) => {
        setWeather(weatherData)
        setForecast(groupForecastByDay(forecastData.list))
      })
      .catch(() => setError('Impossibile recuperare il meteo per questa città.'))
      .finally(() => setLoading(false))
  }, [lat, lon])

  return (
    <section className="detail">
      <Link to="/cerca" className="back-link">&larr; Torna alla ricerca</Link>

      <h2>
        {nome}
        {paese ? ` (${paese})` : ''}
      </h2>

      {loading && <p>Caricamento meteo...</p>}
      {error && <p className="search-error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            width="120"
            height="120"
          />
          <p className="weather-temp">{Math.round(weather.main.temp)}°C</p>
          <p className="weather-description">{weather.weather[0].description}</p>

          <ul className="weather-details">
            <li>🌡️ Percepita: {Math.round(weather.main.feels_like)}°C</li>
            <li>💧 Umidità: {weather.main.humidity}%</li>
            <li>💨 Vento: {weather.wind.speed} m/s</li>
            <li>📊 Pressione: {weather.main.pressure} hPa</li>
          </ul>
        </div>
      )}

      {forecast.length > 0 && (
        <ul className="forecast-strip">
          {forecast.map((day) => (
            <li key={day.date} className="forecast-day">
              <p className="forecast-day-name">
                {new Date(`${day.date}T12:00:00`).toLocaleDateString('it-IT', { weekday: 'short' })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.description}
                width="50"
                height="50"
              />
              <p className="forecast-day-temps">
                <strong>{day.max}°</strong> {day.min}°
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Detail
