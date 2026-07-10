import { useState } from 'react'

/* SearchForm gestisce solo l'input, quando l'utente conferma la ricerca, eleva il valore al genitore */
function SearchForm({ onSearch }) {
  const [city, setCity] = useState('')

  function handleSubmit(event) {
    event.preventDefault() // evita il refresh della pagina che il form farebbe di default

    if (city.trim() === '') {
      return
    }

    // Elevation state, passaggio del valore al genitore tramite la prop onSearch
    onSearch(city.trim())
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Es. Roma, Milano, Torino..."
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button type="submit">Cerca</button>
    </form>
  )
}

export default SearchForm
