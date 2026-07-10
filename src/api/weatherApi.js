const API_KEY = 'aa04e70aa5b067aa63709ce12a35be93'

/* Nome città a coordinate (lat/lon) */
const DIRECT_URL = 'https://api.openweathermap.org/geo/1.0/direct'

/* Coordinate a dati meteo attuali */
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

/* Coordinate a previsioni ogni 3 ore per i prossimi 5 giorni */
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

/*Cerca le città che corrispondono al nome digitato e restituisce un array di città, vuoto se non trova nulla*/
export async function searchCities(cityName) {
  // q è il testo cercato, limit è il numero massimo di risultati, appid è la API KEY
  const url = `${DIRECT_URL}?q=${encodeURIComponent(cityName)}&limit=5&appid=${API_KEY}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Errore nella ricerca della città')
  }

  return response.json()
}

/* Recupera il meteo attuale per lat e lon */
export async function getWeatherByCoords(lat, lon) {
  // units=metric per dare temperature in Celsius
  const url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Errore nel recupero del meteo')
  }

  return response.json()
}

/* Recupera le previsioni (ogni 3 ore, per 5 giorni) per coppia di coord */
export async function getForecastByCoords(lat, lon) {
  const url = `${FORECAST_URL}?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Errore nel recupero delle previsioni')
  }

  return response.json()
}
